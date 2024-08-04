import { observer } from "mobx-react";
import store from "./MyStore";
import InventoryTable from "./InventoryTable";
import LoadProgress from "./LoadProgress";

const InventoryPage = observer(function InventoryPage() {
	// TODO: Fetch items dynamically once store is loaded..?
	return (
		<>
			<h1>Inventory</h1>
			<LoadProgress getValue={() => store.items.size} getMax={() => store.itemCount} />
			<InventoryTable itemIds={store.item_keys} />
		</>
	);
});

export default InventoryPage;
