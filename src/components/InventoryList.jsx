import { observer } from "mobx-react";
import InventoryItem from "./InventoryItem";

// TODO: Refactor "key" to use ID instead of index
const InventoryList = observer(function InventoryList({ items }) {
	return (
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
				{items.map((item) => (
					<InventoryItem key={item.id} item={item} />
				))}
			</tbody>
		</table>
	);
});

export default InventoryList;
