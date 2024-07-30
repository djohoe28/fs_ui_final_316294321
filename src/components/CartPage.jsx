import { observer } from "mobx-react";
import MyStore from "./MyStore";
import InventoryTable from "./InventoryTable";
import { useCallback } from "react";
import store from "./MyStore";

const CartPage = observer(function CartPage() {
	/**
	 * TODO: Fine-tune CartPage versus InventoryPage;
	 * ? Is this still an observer component when cart is mutable?
	 * ? Are there differences between Inventory vs Cart lists?
	 * ? Add a little "X" to delete an item from the cart?
	 * ? Group cart items (count) by their ID?
	 */

	const handleSubmit = useCallback((event) => {
		event.preventDefault();
		store.checkout();
	}, []);
	return (
		<form onSubmit={handleSubmit}>
			<h1>Cart</h1>
			<InventoryTable itemIds={MyStore.cart_keys} />
			<button type="submit">Checkout</button>
		</form>
	);
});

export default CartPage;
