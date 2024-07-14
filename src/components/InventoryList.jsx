import { observer } from "mobx-react";
import InventoryItem from "./InventoryItem";

const InventoryList = observer(({ items }) => (
	<ol>
		{items.map((item) => (
			<InventoryItem key={item.index} item={item} />
		))}
	</ol>
));

export default InventoryList;