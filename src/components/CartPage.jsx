import { observer } from "mobx-react";
import MyStore from "./MyStore";
import InventoryTable from "./InventoryTable";
import { useCallback } from "react";
import store from "./MyStore";

const CartPage = observer(function CartPage() {

	//#region Callbacks
	const handleSubmit = useCallback((event) => {
		event.preventDefault();
		store.checkout();
	}, []);

	const handleReset = useCallback((event)=>{
		event.preventDefault();
		store.emptyCart();
	}, []);
	//#endregion

	return (
		<form onSubmit={handleSubmit} onReset={handleReset}>
			<h1>Cart</h1>
			<InventoryTable itemIds={MyStore.cart_keys} />
			<button type="submit">Checkout</button>
			<button type="reset">Empty Cart</button>
		</form>
	);
});

export default CartPage;
