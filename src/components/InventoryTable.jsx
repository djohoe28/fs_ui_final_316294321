import InventoryItems from "./InventoryItems";
import store from "../modules/MyStore";
import PriceDisplay from "./PriceDisplay";

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
					<th>Clear</th>
					<th>Total</th>
					<th>Image</th>
				</tr>
			</thead>
			<tbody>
				<InventoryItems itemIds={itemIds} />
			</tbody>
			<tfoot>
				<tr>
					<th />
					<th>Sum Total:</th>
					<th colSpan={3} />
					<th>
						<PriceDisplay getPrice={() => store.total} />
					</th>
				</tr>
			</tfoot>
		</table>
	);
});

export default InventoryTable;
