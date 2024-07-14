import { observer } from "mobx-react";
import TextDisplay from "./TextDisplay";

const InventoryItem = observer(function InventoryItem({ item }) {
	return (
		<li>
			<TextDisplay getText={() => item.name} />
		</li>
	);
});

export default InventoryItem;
