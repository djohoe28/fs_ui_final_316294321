import { observer } from "mobx-react";
import InventoryItem from "./InventoryItem";

const InventoryItems = observer(function InventoryItems({ items }) {
	return (
		<>
			{items.map((item) => (
				<InventoryItem key={item.id} item={item} />
			))}
		</>
	);
});

export default InventoryItems;
