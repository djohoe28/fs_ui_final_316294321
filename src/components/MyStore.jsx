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
			"https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0",
			requestOptions
		)
			.then((response) => response.json())
			.then(this.fetchItemsSuccess.bind(this))
			.catch(this.fetchItemsError.bind(this));
	},

	fetchItemsSuccess(result) {
		const fetchedItems = result.results; // TODO: Recursive fetch? result.results: List<{ name, url }>
		this.items = fetchedItems;
		this.state = "done";
		
	},

	fetchItemsError(error) {
		this.state = "error";
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
