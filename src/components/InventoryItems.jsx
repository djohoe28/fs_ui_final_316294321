// import { observer } from "mobx-react"; // NOTE: Not an observer.
import InventoryItem from "./InventoryItem";


/**
 * InventoryItems component.
 * 
 * @todo react/prop-types
 *
 * @description This component displays a list of items from the inventory.
 * @param {Object} props - The props for the component.
 * @param {Array<string>} props.itemIds - The list of item IDs to display.
 * @return {JSX.Element} The InventoryItems component.
 */
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
