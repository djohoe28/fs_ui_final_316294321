// import { observer } from "mobx-react"; // NOTE: Not an observer.
import InventoryItems from "./InventoryItems";
import store from "./MyStore";
import TextDisplay from "./TextDisplay";

// TODO: react/prop-types
const InventoryTable = (function InventoryTable({ itemIds }) {
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
						<TextDisplay getText={() => store.total /* TODO: Observer? */ } />$
					</th>
				</tr>
			</tfoot>
		</table>
	);
});

export default InventoryTable;
