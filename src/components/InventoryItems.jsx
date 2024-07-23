// import { observer } from "mobx-react"; // NOTE: Not an observer.
import InventoryItem from "./InventoryItem";

// TODO: react/prop-types
const InventoryItems = function InventoryItems({ itemIds }) {
	return (
		<>
			{itemIds.map((itemId) => (
				<InventoryItem key={itemId} itemId={itemId} />
			))}
		</>
	);
};

export default InventoryItems;
