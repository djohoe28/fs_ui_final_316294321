import { observer } from "mobx-react";
import MyStore from "./MyStore";
import InventoryTable from "./InventoryTable";

const InventoryPage = observer(function InventoryPage() {
	// TODO: Fetch items dynamically once store is loaded..?
	return (
		<>
			<h1>Inventory</h1>
			<span>Store State = {MyStore.state}</span>
			<InventoryTable items={MyStore.itemIds} />
		</>
	);
});

export default InventoryPage;
