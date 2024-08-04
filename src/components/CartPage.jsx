import { observer } from "mobx-react";
import MyStore from "./MyStore";
import InventoryTable from "./InventoryTable";
import { useCallback } from "react";
import store from "./MyStore";
import ResetButton from "./ResetButton";

const CartPage = observer(function CartPage() {

	//#region Callbacks
	const handleSubmit = useCallback((event) => {
		event.preventDefault();
		store.checkout();
	}, []);

	const handleReset = useCallback((event)=>{
		event.preventDefault();
		store.clearCart();
	}, []);
	//#endregion

	return (
		<form onSubmit={handleSubmit} onReset={handleReset}>
			<h1>Cart</h1>
			<InventoryTable itemIds={MyStore.cart_keys} />
			<button type="submit">Checkout</button>
			<ResetButton text="Clear Cart" />
		</form>
	);
});

export default CartPage;
