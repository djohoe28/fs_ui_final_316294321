import { observer } from "mobx-react";
// import TextDisplay from "./TextDisplay";
import { useCallback, useEffect, useMemo, useState } from "react";
import MyStore from "./MyStore";
import ImageDisplay from "./ImageDisplay";

const InventoryItem = observer(function InventoryItem({ itemId }) {
	const [quantity, setQuantity] = useState(
		`${MyStore.cart.get(itemId)?.quantity ?? 0}`
	);
	const quantityAsNumber = useMemo(() => parseInt(quantity), [quantity]);
	const _itemDetails = useMemo(
		() => {
			return MyStore.items.get(itemId);
		},
		[itemId]
	);
	const handleQuantityChange = useCallback(
		(event) => {
			// TODO: Make sure that no recursive calls occur from these
			if (event.target.value.length === 0) {
				/**
				 // NOTE:
				 * Non-valid string input will revert to 0.
				 * Default (Firefox) behavior reverts invalid string input (e.g.: "5a") to "0";
				 * Therefore we can't separate between a previously-valid input and empty/zero input.
				 * @example	Changing the input "5" to "5a" (ideally reverts to "5")
				 * 			yields the same Change event as changing "5" to "" (ideally converts to "0").
				 * We will follow Firefox behavior and default to "0" instead of the last valid quantity.
				 * Note that this does NOT apply to valid non-positive-integer input ("5.5" converts to "5").
				 */
				setQuantity("0");
			} else {
				// NOTE: Force input string into a positive integer string (fallback: quantityAsNumber)
				setQuantity(
					`${Math.abs(parseInt(event.target.value) ?? quantityAsNumber)}`
				);
			}
		},
		[quantityAsNumber, setQuantity]
	);
	const handleDelete = useCallback(() => setQuantity("0"), [setQuantity]);
	useEffect(() => {
		// NOTE: Performance-wise, this belongs in the handler; Concern-wise, this is a re/action => effect
		MyStore.setItemQuantity(itemId, quantityAsNumber);
	}, [itemId, quantityAsNumber]);
	return (
		<tr>
			<td>
				{/* <TextDisplay getText={() => itemId} /> // TODO: Not an observer? */}
				{itemId}
			</td>
			<td>
				{/* <TextDisplay getText={() => _itemDetails.name} /> // TODO: Not an observer? */}
				{_itemDetails.name}
			</td>
			<td>
				{/* <TextDisplay getText={() => _itemDetails.price} />$ // TODO: Not an observer? */}
				{_itemDetails.price}$
			</td>
			<td>
				<input
					type="number"
					min={0}
					value={quantity}
					onChange={handleQuantityChange}
				/>
				<button type="reset" onClick={handleDelete}>
					x
				</button>
				{quantityAsNumber > 0 ? (
					<>
						=
						{/* <TextDisplay
							getText={() =>
								quantityAsNumber * _itemDetails.price
							}
						/> // TODO: Not an observer? */}
						{quantityAsNumber * _itemDetails.price}
						$
					</>
				) : null}
			</td>
			<td>
				<ImageDisplay
					getSrc={() =>
						_itemDetails.image_src ?? MyStore.logoBlobSrc
					}
				/>
				{/* <TextDisplay getText={() => _itemDetails.order} /> // TODO: Not an observer? */}
				{_itemDetails.order}
			</td>
		</tr>
	);
});

export default InventoryItem;
