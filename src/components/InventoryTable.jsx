// import { observer } from "mobx-react"; // NOTE: Not an observer.
import InventoryItems from "./InventoryItems";
// import TextDisplay from "./TextDisplay";
import store from "./MyStore";

// TODO: react/prop-types
const InventoryTable = function InventoryTable({ itemIds }) {
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
				<InventoryItems itemIds={itemIds} />
			</tbody>
			<tfoot>
				<tr>
					<th colSpan={2} />
					<th>Total:</th>
					<th>
						{/* <TextDisplay getText={() => MyStore.total} />$ // TODO: Not an observer? */}
						{store.total}$
					</th>
				</tr>
			</tfoot>
		</table>
	);
};

export default InventoryTable;
