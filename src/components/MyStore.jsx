import { autorun, entries, makeAutoObservable } from "mobx";

const MyStore = {
	items: [],
	cart: {},
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
		quantity > 0
			? (this.cart[itemId] = quantity)
			: delete this.cart[itemId];
	},

	
	get itemsById() {
		// SEE: https://mobx.js.org/collection-utilities.html#collection-utilities-
		return new Map(this.items.map(item => [`${item.id}`, item]));
	},

	get total() {
		// NOTE: Aggregate total; iterate through items in cart, and add their price times quantity to total.
		let total = 0;
		entries(this.cart).forEach(([itemId, quantity]) => {
			const item = this.itemsById.get(itemId);
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
