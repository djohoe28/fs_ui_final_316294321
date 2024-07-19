import { observer } from "mobx-react";
import TextDisplay from "./TextDisplay";

const InventoryItem = observer(function InventoryItem({ item }) {
	return (
		<li>
			<TextDisplay getText={() => item.name} />
			{"\t"}(<TextDisplay getText={() => item.base_experience} />$)
		</li>
	);
});

export default InventoryItem;
