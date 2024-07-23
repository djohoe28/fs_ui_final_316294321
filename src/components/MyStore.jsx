import { keys, makeAutoObservable } from "mobx";

const MyStore = {
	_count: 10, // 1025
	logoBlob: undefined,
	logoBlobSrc: "",
	items: new Map(), // NOTE: Map<id: number, item_details: { name: string, price: number, order: number, image_src: string }>
	cart: new Map(), // NOTE: Map<id: number, cart_details: { order: number, quantity: number }>

	get item_keys() {
		return keys(this.items).slice().sort((a, b) => this.items.get(a).order - this.items.get(b).order); // TODO: Refactor?
	},

	get cart_keys() {
		return keys(this.cart).slice().sort((a, b) => this.cart.get(a).order - this.cart.get(b).order); // TODO: Refactor?
	},

	// TODO: Delete?
	// get itemsAsArray() {
	// 	return Array.from(this.items).sort((a, b) => a[1].order - b[1].order);
	// },

	get cartAsArray() {
		return Array.from(this.cart).sort((a, b) => a[1].order - b[1].order);
	},

	// TODO: Delete?
	// get progress() {
	// 	return this.items.size / this._count;
	// },

	get total() {
		// NOTE: Aggregate total; iterate through items in cart, and add their price times quantity to total.
		let total = 0;
		this.cart_keys.forEach((key) => {
			const price = this.items.get(key)?.price;
			const quantity = this.cart.get(key)?.quantity;
			total += price * quantity;
		});
		return total;
	},

	init() {
		this.fetchLogo();
		this.fetchItems();
		window.exports = { store: this };
	},

	fetchLogo() {
		fetch(
			"https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
		)
			.then((logo_res) => logo_res.blob())
			.then((logo_blob) => this.setLogoFromBlob(logo_blob))
			.catch((error) => console.error(error));
	},

	setLogoFromBlob(logo_blob) {
		this.logoBlob = logo_blob;
		this.logoBlobSrc = URL.createObjectURL(this.logoBlob);
	},

	fetchItems() {
		fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this._count}&offset=0`, {
			method: "GET",
			headers: { Accept: "application/json" },
			redirect: "follow",
		})
			.then((items_res) => items_res.json())
			.then((items_json) => this.parseItems(items_json))
			.catch((error) => this.handleError(error));
	},

	parseItems(items_json) {
		const fetchedItems = items_json.results; // TODO: Recursive fetch? result.results: List<{ name, url }>
		fetchedItems.forEach((item) => {
			fetch(item.url, {
				method: "GET",
				headers: { Accept: "application/json" },
				redirect: "follow",
			})
				.then((details_res) => details_res.json())
				.then((details_json) => this.parseItemDetails(details_json))
				.catch((error) => this.handleError(error));
		});
	},

	parseItemDetails(details_json) {
		const key = details_json.id;
		const value = {
			name: details_json.name,
			price: details_json.base_experience,
			order: details_json.order,
			image_src: details_json.sprites.front_default,
		};
		this.items.set(key, value);
	},

	handleError(error) {
		this.state = "error";
		console.error(error);
	},

	// TODO: Make sure this is MobX-compliant.
	setItemQuantity(itemId, quantity) {
		quantity <= 0
			? this.cart.delete(itemId)
			: this.cart.set(itemId, {
				quantity: quantity,
				order: this.cart.get(itemId)?.order ?? Date.now(),
			});
	},
};
makeAutoObservable(MyStore);

MyStore.init();

export default MyStore;
