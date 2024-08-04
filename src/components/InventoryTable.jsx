import InventoryItems from "./InventoryItems";
import store from "./MyStore";
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
					<th>Total</th>
					<th>Image</th>
				</tr>
			</thead>
			<tbody>
				<InventoryItems itemIds={itemIds} />
			</tbody>
			<tfoot>
				<tr>
					<th colSpan={2} />
					<th>Combined Total:</th>
					<th>
						<PriceDisplay getPrice={() => store.total} />
					</th>
				</tr>
			</tfoot>
		</table>
	);
});

export default InventoryTable;
