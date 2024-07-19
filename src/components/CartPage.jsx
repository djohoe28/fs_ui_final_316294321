import { observer } from "mobx-react";
import InventoryList from "./InventoryList";
import MyStore from "./MyStore";

const CartPage = observer(function CartPage() {
	/**
	 * TODO: Fine-tune CartPage versus InventoryPage;
	 * ? Is this still an observer component when cart is mutable?
	 * ? Are there differences between Inventory vs Cart lists?
	 * ? Add a little "X" to delete an item from the cart?
	 * ? Group cart items (count) by their ID?
	 */
	return (
		<>
			<h1>Cart</h1>
			{/* <InventoryList items={MyStore.cart} /> */}
		</>
	);
});

export default CartPage;
