import { observer } from "mobx-react";
import TextDisplay from "./TextDisplay";
import { useCallback, useEffect, useState } from "react";
import MyStore from "./MyStore";

const InventoryItem = observer(function InventoryItem({ item }) {
	const [quantity, setQuantity] = useState(MyStore.cart[item.id] ?? 0);
	const handleQuantityChange = useCallback(
		(e) => {
			// TODO: Make sure that no recursive calls occur from these
			if (isNaN(e.target.valueAsNumber)) {
				// NOTE: Reset non-numeric string-value to 0 (prevent NaN)
				e.target.value = "0";
			}
			if (e.target.value.length !== `${e.target.valueAsNumber}`.length) {
				// NOTE: Force string-value to equal numeric-value (prevent leading zeroes, leading "+")
				e.target.value = `${e.target.valueAsNumber}`;
			}
			if (e.target.valueAsNumber < 0) {
				// NOTE: Force absolute numeric value (prevent negative values)
				e.target.valueAsNumber = Math.abs(e.target.valueAsNumber);
			}
			setQuantity(e.target.valueAsNumber);
		},
		[setQuantity]
	);
	const handleDelete = useCallback((e) => setQuantity(0), [setQuantity]);
	useEffect(() => {
		// TODO: Performance-wise, this belongs in the handler; Concern-wise, this is a re/action => effect
		MyStore.setItemQuantity(item.id, quantity);
	}, [quantity]);
	return (
		<tr>
			<td>
				<TextDisplay getText={() => item.id} />
			</td>
			<td>
				<TextDisplay getText={() => item.name} />
			</td>
			<td>
				<TextDisplay getText={() => item.base_experience} />$
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
				{quantity > 0 ? (
					<>
						=
						<TextDisplay
							getText={() => quantity * item.base_experience}
						/>
						$
					</>
				) : null}
			</td>
		</tr>
	);
});

export default InventoryItem;
