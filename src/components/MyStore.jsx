import { keys, makeAutoObservable, reaction } from "mobx";

class MyStore {
	constructor() {
		//#region Properties
		this.logoBlob = undefined;
		this.logoBlobSrc = "";
		this.defaultCurrency = "USD"; // NOTE: This is expected to be the currency used under `items.price` as well.
		this.itemCount = 9; // 0 <= count <= 1025
		this.items = new Map(); // NOTE: Map<id: number, item_details: { name: string, price: number, order: number, image_src: string }>
		this.cart = new Map(); // NOTE: Map<id: number, cart_details: { order: number, quantity: number }>
		this.rates = new Map(); // NOTE: Map<currency: string, rate: number> (where `1 ${defaultCurrency} = ${rate} ${currency})
		//#endregion
		makeAutoObservable(this);
		//#region Reactions
		this.disposer = reaction(() => this.itemCount, (value, previousValue, reaction) => {
			// TODO: Add rates?
			// NOTE: React to changes in count.
			console.log({ value, previousValue, reaction });
			this.cart_keys.filter(key => key > this.itemCount).forEach(key => {
				console.log(key, this.item_keys.indexOf(key), this.itemCount);
				this.cart.delete(key);
			})
			this.items.clear();
			this.fetchItems();
		});
		//#endregion
		this.fetchLogo();
		this.fetchItems();
		this.fetchRates();
	}

	get item_keys() {
		return keys(this.items).slice().sort((a, b) => this.items.get(a).order - this.items.get(b).order);
	}

	get cart_keys() {
		return keys(this.cart).slice().sort((a, b) => this.cart.get(a).order - this.cart.get(b).order);
	}

	get total() {
		// NOTE: Aggregate total; iterate through items in cart, and add their price times quantity to total.
		let total = 0;
		this.cart_keys.forEach((key) => {
			const price = this.items.get(key)?.price;
			const quantity = this.cart.get(key)?.quantity;
			total += price * quantity;
		});
		return total;
	}

	fetchRates = () => {
		fetch(`https://open.er-api.com/v6/latest/${this.defaultCurrency}`).then((rates_res) => rates_res.json()).then((rates_json) => this.setRates(rates_json)).catch((error) => this.handleError(error));
	}

	setRates = (rates_json) => {
		this.rates = new Map();
		for (const [key, value] of Object.entries(rates_json["rates"])) {
			this.rates.set(key, value);
		}
	}

	fetchLogo = () => {
		fetch(
			"https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
		)
			.then((logo_res) => logo_res.blob())
			.then((logo_blob) => this.setLogoFromBlob(logo_blob))
			.catch((error) => console.error(error));
	}

	setLogoFromBlob = (logo_blob) => {
		this.logoBlob = logo_blob;
		this.logoBlobSrc = URL.createObjectURL(this.logoBlob);
	}

	fetchItems = () => {
		fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.itemCount}&offset=0`, {
			method: "GET",
			headers: { Accept: "application/json" },
			redirect: "follow",
		})
			.then((items_res) => items_res.json())
			.then((items_json) => this.parseItems(items_json))
			.catch((error) => this.handleError(error));
	}

	parseItems = (items_json) => {
		const fetchedItems = items_json.results;
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
	}

	parseItemDetails = (details_json) => {
		const key = details_json.id;
		const value = {
			id: details_json.id,
			name: details_json.name,
			price: details_json.base_experience,
			order: details_json.id, // NOTE: The `order` API property is currently flawed, so we use `id` instead.
			image_src: details_json.sprites.front_default,
		};
		this.items.set(key, value);
	}

	handleError = (error) => {
		this.state = "error";
		console.error(error);
	}

	setItemQuantity = (itemId, quantity) => {
		quantity <= 0
			? this.cart.delete(itemId)
			: this.cart.set(itemId, {
				quantity: quantity,
				order: this.cart.get(itemId)?.order ?? Date.now(),
			});
	}

	checkout = () => {
		// NOTODO: Implement.
		// NOTE:	Since the APIs are mostly accessed via the `store` object,
		//			it's probably fine to do this here.
		//			Plus, you get immediate access to the `cart` property from here!
		alert("Order submitted! Don't worry - we already charged you and we know where you live ;)");
		this.cart.clear();
	}

	emptyCart = () => {
		this.cart.clear();
	}
}

/**
 * // TODO:
 * [mobx] Observable 'MyStore@1.parseItems' being read outside a reactive context.
 * [mobx] Observable 'MyStore@5.setLogoFromBlob' being read outside a reactive context. inventory:13851:25
 * [mobx] Observable 'MyStore@1.parseItemDetails' being read outside a reactive context. inventory:13851:25
 * [mobx] Observable 'MyStore@1.setItemQuantity' being read outside a reactive context. 
 * observerComponent@http://localhost:5173/node_modules/.vite/deps/mobx-react.js?v=9b6d7153:421:12
 * InventoryItems2@http://localhost:5173/src/components/InventoryItems.jsx?t=1722004635895:18:48
 */
const store = new MyStore();

export default store;