import { useCallback, useState } from "react";
import { observer } from "mobx-react";
import store from "./MyStore";
import ResetButton from "./ResetButton";

const generations = [
	{
		name: "Kanto Starters",
		value: 9,
	},
	{
		name: "Generation I (RGBY)",
		value: 151,
	},
	{
		name: "Generation II (GSC)",
		value: 251,
	},
	{
		name: "Generation III (RSE)",
		value: 386,
	},
	{
		name: "Generation IV (DPPt)",
		value: 493,
	},
	{
		name: "Generation V (B2W2)",
		value: 649,
	},
	{
		name: "Generation VI (XY)",
		value: 721,
	},
	{
		name: "Generation VII (USUM)",
		value: 809,
	},
	{
		name: "Generation VIII (SwSh + PLA)",
		value: 905,
	},
	{
		name: "Generation IX (SV + DLC)",
		value: 1025,
	}
]

const AdminOptions = observer(function AdminOptions() {
	const [state, setState] = useState(store.itemCount);
	const handleSelectChange = useCallback((e) => {
		setState(e.target.value);
	}, [setState]);
	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		store.itemCount = parseInt(state);
	}, [state]);
	return <form onSubmit={handleSubmit}>
		<details open>
			<summary>Admin Options</summary>
			<label htmlFor="generation">Latest Available Stock: </label>
			<select name="generation" onChange={handleSelectChange}>
				{generations.map(({ name, value }) => <option key={value} value={value}>#{value} ~ {name}</option>)}
			</select>
			<ResetButton text="Reset" />
			<button type="submit">Submit</button>
		</details>
	</form>
});

export default AdminOptions;
