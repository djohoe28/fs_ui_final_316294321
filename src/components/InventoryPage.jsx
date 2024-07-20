import { observer } from "mobx-react";
import InventoryList from "./InventoryList";
import MyStore from "./MyStore";
import TextDisplay from "./TextDisplay";

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
						<th>Image</th>
					</tr>
				</thead>
				<tbody>
					<InventoryList items={MyStore.items} />
				</tbody>
				<tfoot>
					<tr>
						<th colSpan={2} />
						<th>Total:</th>
						<th>
							<TextDisplay getText={() => MyStore.total} />$
						</th>
					</tr>
				</tfoot>
			</table>
		</>
	);
});

export default InventoryPage;
