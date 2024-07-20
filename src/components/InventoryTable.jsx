import { observer } from "mobx-react";
import InventoryItems from "./InventoryItems";
import TextDisplay from "./TextDisplay";
import MyStore from "./MyStore";

const InventoryTable = observer(function InventoryTable({ items }) {
	return (
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
				<InventoryItems items={items} />
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
	);
});
export default InventoryTable;
