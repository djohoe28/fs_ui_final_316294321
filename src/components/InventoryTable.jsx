import InventoryItems from "./InventoryItems";
import store from "../modules/MyStore";
import PriceDisplay from "./PriceDisplay";

/**
 * InventoryTable component.
 *
 * @description This component displays the current cart contents.
 * @todo react/prop-types
 * @param {Object} props - The props for the component.
 * @param {string[]} props.itemIds - The IDs of the items to display.
 * @return {JSX.Element} The InventoryTable component.
 */
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
