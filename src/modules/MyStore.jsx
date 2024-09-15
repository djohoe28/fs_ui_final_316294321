import { keys, makeAutoObservable, reaction } from "mobx";

/**
 * Represents the application's store, managing data and state.
 */
class MyStore {
	/**
	 * The constructor of the MyStore class, initializing the properties and MobX observables.
	 * The constructor also sets up the following reactions:
	 * - On change of `itemCount`, the cart contents are updated (items with IDs greater than `itemCount` are removed),
	 *   and the items and rates are refetched.
	 * - On change of `items`, the cart contents are updated (items not in `items` are removed).
	 */
	constructor() {
		//#region Properties
		/** The root URL of the Exchange Rates API. */
		this._ratesAPI = "https://open.er-api.com/v6/latest/";
		/** The URL of the logo image to be fetched. */
		this._logoUrl = "https://pokeshop.co.il/wp-content/uploads/2022/07/2020-pokeshop-logos-1.png";
		/** The loaded blob of the logo image. */
		this._logoBlob = undefined;
		/** The Object URL of the loaded blob of the logo image. */
		this.logoBlobSrc = "";
		/**
		 * The default currency used in the store. Used as baseline for exchange rates.
		 * NOTE: This is expected to be the currency used under `items.price` as well.
		 */
		this.defaultCurrency = "USD"; // 
		/**
		 * How many items to fetch from the API.
		 * Used as dev-mode shorthand for making changes to the "inventory".
		 * Available values: 0 <= count <= 1025
		 */
		this.itemCount = 9;
		/**
		 * Map of item IDs to their details (name, price, order, image source).
		 * 
		 * @type {Map<number, { name: string, price: number, order: number, image_src: string }>}
		 */
		this.items = new Map();
		/**
		 * Map of item IDs to their cart details (quantity and order).
		 * @type {Map<number, { order: number, quantity: number }>}
		 */
		this.cart = new Map();
		/**
		 * Map of currency codes to their exchange rate to the default currency.
		 * @description 1 {@link defaultCurrency} = {@link rates}[currency_code] {currency_code}
		 * 
		 * @type {Map<string, number>}
		 */
		this.rates = new Map();
		/**
		 * Pre-made list of Pokemon Generations.
		 * Used as options in the Admin panel for determining "inventory".
		 */
		this._generations = [
			{
				name: "Kanto Starters",
				value: 9,
			},
			{
				name: "Generation I (RGBY)",
				value: 151,
			},
			{
				name: "Generation II (GSC)",
				value: 251,
			},
			{
				name: "Generation III (RSE)",
				value: 386,
			},
			{
				name: "Generation IV (DPPt)",
				value: 493,
			},
			{
				name: "Generation V (B2W2)",
				value: 649,
			},
			{
				name: "Generation VI (XY)",
				value: 721,
			},
			{
				name: "Generation VII (USUM)",
				value: 809,
			},
			{
				name: "Generation VIII (SwSh + PLA)",
				value: 905,
			},
			{
				name: "Generation IX (SV + DLC)",
				value: 1025,
			}
		]
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

	/**
	 * Returns an array of item IDs, sorted by their order ( ascending ).
	 * @returns {string[]} An array of item IDs.
	 */
	get item_keys() {
		return keys(this.items).slice().sort((a, b) => this.items.get(a).order - this.items.get(b).order);
	}

	/**
	 * Returns an array of item IDs in the cart, sorted by their order ( ascending ).
	 * @returns {string[]} An array of item IDs.
	 */
	get cart_keys() {
		return keys(this.cart).slice().sort((a, b) => this.cart.get(a).order - this.cart.get(b).order);
	}

	/**
	 * Returns the total cost of all items in the cart, calculated by summing the cost of each item
	 * multiplied by its quantity.
	 * @returns {number} The total cost of all items in the cart.
	 */
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

	/**
	 * The API Endpoint for the default currency's exchange rates.
	 */
	get currencyRatesUrl() { return new URL(this.defaultCurrency, this._ratesAPI); }

	/**
	 * Fetches the exchange rates from the Exchange Rates API.
	 * @returns {Promise} A promise that resolves when the rates have been fetched.
	 */
	fetchRates = () => {
		fetch(this.currencyRatesUrl).then((rates_res) => rates_res.json()).then((rates_json) => this.setRates(rates_json)).catch((error) => this.handleError(error));
	}

	/**
	 * Sets the exchange rates in the store.
	 * @param {object} rates - The exchange rates to set.
	 * @returns {void}
	 */
	setRates = (rates_json) => {
		this.rates = new Map();
		for (const [key, value] of Object.entries(rates_json["rates"])) {
			this.rates.set(key, value);
		}
	}

	/**
	 * Fetches the logo image from the specified URL.
	 * @returns {Promise} A promise that resolves when the logo has been fetched
	 */
	fetchLogo = () => {
		fetch(this._logoUrl)
			.then((logo_res) => logo_res.blob())
			.then((logo_blob) => this.setLogoFromBlob(logo_blob))
			.catch((error) => console.error(error));
	}

	/**
	 * Sets the logo image in the store from a blob.
	 * @param {Blob} logo_blob - The logo image blob.
	 * @returns {void}
	 */	
	setLogoFromBlob = (logo_blob) => {
		this._logoBlob = logo_blob;
		this.logoBlobSrc = URL.createObjectURL(this._logoBlob);
	}

	/**
	 * Fetches a list of items from the Pokémon API.
	 * @returns {Promise} A promise that resolves when the items have been fetched.
	 */
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

	/**
	 * Parses a list of items from the API response.
	 * @param {object} items_json - The JSON response from the API.
	 * @returns {void}
	 */
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

	/**
	 * Parses the item details from the API response.
	 * @param {object} details_json - The JSON response from the API.
	 * @returns {void}
	 */
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

	/**
	 * Handles any errors that occur during API requests or other operations.
	 * @param {Error} error - The error that occurred.
	 * @returns {void}
	 */
	handleError = (error) => {
		this.state = "error";
		console.error(error);
	}

	/**
	 * Sets the quantity of an item in the cart.
	 * @param {string} itemId - The ID of the item to update.
	 * @param {number} quantity - The new quantity of the item.
	 * @returns {void}
	 */
	setItemQuantity = (itemId, quantity) => {
		quantity <= 0
			? this.cart.delete(itemId)
			: this.cart.set(itemId, {
				quantity: quantity,
				order: this.cart.get(itemId)?.order ?? Date.now(),
			});
	}

	/**
	 * Simulates a checkout operation by clearing the cart and displaying a success message.
	 * @returns {void}
	 */
	checkout = () => {
		// NOTODO:	Implement.
		// NOTE:	Since the APIs are mostly accessed via the `store` object,
		//			it's probably fine to do this here.
		//			Plus, you get immediate access to the `cart` property from here!
		alert("Order submitted! Don't worry - we already charged you and we know where you live ;)");
		this.cart.clear();
	}

	/**
	 * Clears all items from the cart.
	 * @returns {void}
	 */
	clearCart = () => {
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