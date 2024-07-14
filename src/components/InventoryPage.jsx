import { observer } from "mobx-react";
import InventoryList from "./InventoryList";
import MyStore from "./MyStore";

const InventoryPage = observer(function InventoryPage() {
	// TODO: Fetch items dynamically once store is loaded..?
	return (
		<>
			<h1>Inventory</h1>
			<span>Store State = {MyStore.state}</span>
			<InventoryList items={MyStore.items} />
		</>
	);
});

export default InventoryPage;
