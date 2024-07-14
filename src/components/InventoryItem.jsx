import { observer } from "mobx-react";
import TextDisplay from "./TextDisplay";

const InventoryItem = observer(({ item }) => (
	<li>
		<TextDisplay getText={() => item.species.name} />
	</li>
));

export default InventoryItem;