import { observer } from "mobx-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import store from "./MyStore";
import ImageDisplay from "./ImageDisplay";
import PriceDisplay from "./PriceDisplay";
import ResetButton from "./ResetButton";

const MIN_ITEM_QUANTITY = 0; // NOTE: Currently, this is only for refactoring purposes.
const MAX_ITEM_QUANTITY = 999; // NOTE: Completely arbitray, intended to stop text/number overflow.

const InventoryItem = observer(function InventoryItem({ itemId }) {
	const [quantity, setQuantity] = useState(
		`${store.cart.get(itemId)?.quantity ?? MIN_ITEM_QUANTITY}`
	);
	const quantityAsNumber = useMemo(() => parseInt(quantity), [quantity]);
	const _itemDetails = useMemo(
		() => {
			return store.items.get(itemId);
		},
		[itemId]
	);
	const handleQuantityChange = useCallback(
		(event) => {
			// TODO: Make sure that no recursive calls occur from these
			const parsed = parseInt(event.target.value);
			let newQuantityAsNumber;
			if (event.target.value.length === 0) { newQuantityAsNumber = MIN_ITEM_QUANTITY; } // NOTE: Value empty => floor	
			else if (isNaN(parsed)) { newQuantityAsNumber = quantityAsNumber; } // NOTE: Value invalid => revert
			else if (parsed < MIN_ITEM_QUANTITY) { newQuantityAsNumber = MIN_ITEM_QUANTITY; } // NOTE: Value floor
			else if (parsed > MAX_ITEM_QUANTITY) { newQuantityAsNumber = MAX_ITEM_QUANTITY; } // NOTE: Value ceiling
			else { newQuantityAsNumber = parsed; } // NOTE: Value valid => update
			setQuantity(`${newQuantityAsNumber}`);
		},
		[quantityAsNumber, setQuantity]
	);
	const handleDelete = useCallback((event) => {
		// NOTE: Since we're using ResetButton outside of a form, we prevent the default "reset" behavior here.
		event.preventDefault();
		setQuantity("0");
	}, [setQuantity]);
	useEffect(() => {
		// NOTE: Performance-wise, this belongs in `handleQuantityChange`; Concern-wise, this is a re/action => effect
		store.setItemQuantity(itemId, quantityAsNumber);
	}, [itemId, quantityAsNumber]);
	return (
		<tr>
			<td>
				{itemId}
			</td>
			<td>
				{_itemDetails.name}
			</td>
			<td>
				<PriceDisplay getPrice={() => _itemDetails.price} />
			</td>
			<td>
				<input
					type="number"
					min={0}
					max={MAX_ITEM_QUANTITY}
					value={quantity}
					onChange={handleQuantityChange}
				/>
			</td>
			<td>
				{quantityAsNumber > 0
					? <ResetButton onClick={handleDelete} text="x" />
					: null}
			</td>
			<td>
				{quantityAsNumber > 0
					? <PriceDisplay getPrice={() => quantityAsNumber * _itemDetails.price} />
					: null}
			</td>
			<td>
				<ImageDisplay
					getSrc={() =>
						_itemDetails.image_src ?? store.logoBlobSrc
					}
					getAlt={() => _itemDetails.image_src ?? store.logoBlobSrc}
				/>
			</td>
		</tr>
	);
});

export default InventoryItem;
