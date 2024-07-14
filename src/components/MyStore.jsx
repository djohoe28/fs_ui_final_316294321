import { autorun, makeAutoObservable } from "mobx";

const MyStore = {
	items: [],
	cart: [],
	state: "pending", // state = "pending" | "done" | "error"

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
			"https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
			requestOptions
		)
			.then((response) => response.json())
			.then(this.fetchItemsSuccess)
			.catch(this.fetchItemsError);
	},

	fetchItemsSuccess(result) {
		const fetchedItems = result.results; // TODO: Apply filter(s)?
		this.items = fetchedItems;
		this.state = "done";
	},

	fetchItemsError(error) {
		this.state = "error";
	},
};
makeAutoObservable(MyStore);

autorun(() => {
	console.log(`MyStore items := ${JSON.stringify(MyStore.items)}`);
});
autorun(() => {
	console.log(`MyStore cart := ${JSON.stringify(MyStore.cart)}`);
});
autorun(() => {
	console.log(`MyStore state := ${MyStore.state}`);
});

MyStore.init();

export default MyStore;
