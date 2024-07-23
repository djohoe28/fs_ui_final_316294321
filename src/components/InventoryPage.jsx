import { observer } from "mobx-react";
import MyStore from "./MyStore";
import InventoryTable from "./InventoryTable";
import LoadProgress from "./LoadProgress";

const InventoryPage = observer(function InventoryPage() {
	// TODO: Fetch items dynamically once store is loaded..?
	return (
		<>
			<h1>Inventory</h1>
			<LoadProgress getValue={() => MyStore.items.size} getMax={() => MyStore._count} />
			<InventoryTable itemIds={MyStore.item_keys} />
		</>
	);
});

export default InventoryPage;
