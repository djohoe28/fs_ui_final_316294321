import { observer } from "mobx-react";
import store from "../modules/MyStore";
import InventoryTable from "./InventoryTable";
import LoadProgress from "./LoadProgress";

/**
 * InventoryPage component.
 *
 * @description This component displays the available items for purchase, organized by Generation (I-VIII).
 * @uses MyStore MobX store to retrieve the available items and their corresponding quantities.
 * @return {JSX.Element} The InventoryPage component, including the load progress indicator and inventory table.
 */
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
