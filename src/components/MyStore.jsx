import { autorun, entries, makeAutoObservable, values } from "mobx";

const MyStore = {
	items: [],
	cart: [],
	state: "pending", // state = "pending" | "done" | "error"
	_count: 10, // 1025

	init() {
		this.fetchItems();
	},

	fetchItems() {
		const myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");

		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=${this._count}&offset=0`,
			requestOptions
		)
			.then((response) => response.json())
			.then(this.fetchItemsSuccess.bind(this))
			.catch(this.fetchItemsError.bind(this));
	},

	fetchItemsSuccess(result) {
		const myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");

		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		const fetchedItems = result.results; // TODO: Recursive fetch? result.results: List<{ name, url }>
		fetchedItems.forEach((item) => {
			fetch(item.url, requestOptions)
				.then((response) => response.json())
				.then(this.fetchItemDetailsSuccess.bind(this))
				.catch(this.fetchItemsError.bind(this));
		});
	},

	fetchItemDetailsSuccess(result) {
		this.items.push(result);
		if (this.items.length === this._count) {
			this.finalizeItems();
		}
	},

	finalizeItems() {
		this.items = this.items.slice().sort((a, b) => a.order - b.order); // TODO: Mutative?
		this.state = "done";
		window.exports = { store: this };
	},

	fetchItemsError(error) {
		this.state = "error";
		console.error(error);
	},

	// TODO: Make sure this is MobX-compliant.
	setItemQuantity(itemId, quantity) {
		// quantity > 0
		// 	? (this.cart.find((index, item_id)[itemId] = quantity))
		// 	: delete this.cart[itemId];
		// NOTE: Delete item from cart
		if (quantity <= 0) {
			this.cart = this.cart.filter(({ id }) => itemId !== id);
			return;
		}
		// NOTE: Find item in cart (in case it was already added)
		const item = this.cart.find(({ id }) => id === itemId);
		// NOTE: Set item quantity in cart (add if missing, update if existing)
		item
			? (item.quantity = quantity)
			: this.cart.push({ id: itemId, quantity });
	},

	get itemIds() {
		let ids = [];
		this.items.forEach(({ id }) => ids.push({ id }));
		return ids;
	},

	get itemsById() {
		// SEE: https://mobx.js.org/collection-utilities.html#collection-utilities-
		return new Map(this.items.map((item) => [item.id, item]));
	},

	getQuantityById(itemId) {
		return this.cart.find(({ id }) => id === itemId)?.quantity;
	},

	get total() {
		// NOTE: Aggregate total; iterate through items in cart, and add their price times quantity to total.
		let total = 0;
		values(this.cart).forEach(({ id, quantity }) => {
			const item = this.itemsById.get(id);
			const price = item.base_experience;
			total += price * quantity;
		});
		return total;
	},
};
makeAutoObservable(MyStore);

autorun(() => {
	console.log("MyStore.items :=", MyStore.items);
});
autorun(() => {
	console.log("MyStore cart :=", MyStore.cart);
});
autorun(() => {
	console.log(`MyStore state := ${MyStore.state}`);
});

MyStore.init();

export default MyStore;
