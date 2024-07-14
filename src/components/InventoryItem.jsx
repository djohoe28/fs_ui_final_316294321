import { observer } from "mobx-react";
import TextDisplay from "./TextDisplay";

const InventoryItem = observer(({ item }) => (
	<li>
		<TextDisplay getText={() => item.name} />
	</li>
));

export default InventoryItem;