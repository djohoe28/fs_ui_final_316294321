import { observer } from "mobx-react";
import InventoryItem from "./InventoryItem";

const InventoryList = observer(function InventoryList({ items }) {
	return (
		<>
			{items.map((item) => (
				<InventoryItem key={item.id} item={item} />
			))}
		</>
	);
});

export default InventoryList;
