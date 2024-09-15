import { useCallback, useState } from "react";
import { observer } from "mobx-react";
import ResetButton from "./ResetButton";
import SubmitButton from "./SubmitButton";
import store from "../modules/MyStore";

/**
 * AdminOptions component.
 *
 * @description This component provides a form for administrators to update the latest available stock.
 * @uses MyStore MobX store to retrieve and update the item count.
 * @return {JSX.Element} The AdminOptions form component.
 */
const AdminOptions = observer(function AdminOptions() {
	const [state, setState] = useState(store.itemCount);
	const handleSelectChange = useCallback((e) => {
		setState(e.target.value);
	}, [setState]);
	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		store.itemCount = parseInt(state);
		alert("Changes submitted!");
	}, [state]);
	return <form onSubmit={handleSubmit}>
		<details open>
			<summary>Admin Options</summary>
			<label htmlFor="generation">Latest Available Stock: </label>
			<select name="generation" onChange={handleSelectChange}>
				{store._generations.map(({ name, value }) => <option key={value} value={value}>#{value} ~ {name}</option>)}
			</select>
			<ResetButton text="Reset" />
			<SubmitButton text="Submit" />
		</details>
	</form>
});

export default AdminOptions;
