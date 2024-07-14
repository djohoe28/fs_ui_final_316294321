import { observer } from "mobx-react";
import InventoryItem from "./InventoryItem";

// TODO: Refactor "key" to use ID instead of index
const InventoryList = observer(({ items }) => (
	<ol>
		{items.map((item, index) => (
			<InventoryItem key={index} item={item} />
		))}
	</ol>
));

export default InventoryList;