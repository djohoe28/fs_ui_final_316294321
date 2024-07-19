import { observer } from "mobx-react";
import InventoryList from "./InventoryList";
import MyStore from "./MyStore";

const InventoryPage = observer(function InventoryPage() {
	// TODO: Fetch items dynamically once store is loaded..?
	return (
		<>
			<h1>Inventory</h1>
			<span>Store State = {MyStore.state}</span>
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody>
					<InventoryList items={MyStore.items} />
				</tbody>
			</table>
		</>
	);
});

export default InventoryPage;
