import { useCallback, useContext, useState } from "react";
import { observer } from "mobx-react";
import store from "./MyStore";
import { keys } from "mobx";
import UserContext from "../modules/UserContext";

const CustomerOptions = observer(function CustomerOptions() {
	const userContext = useContext(UserContext);
	const [state, setState] = useState(store.currency);
	const handleSelectChange = useCallback((e) => {
		setState(e.target.value);
	}, [setState]);
	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		userContext.dispatch({
			type: "SET_CURRENCY",
			value: state
		})
	}, [state, userContext]);
	return <form onSubmit={handleSubmit}>
		<details open>
			<summary>Customer Options</summary>
			<label htmlFor="currency">Currency: </label>
			<select name="currency" onChange={handleSelectChange}>
				{keys(store.rates).map(currencyKey => <option key={currencyKey} value={currencyKey}>{currencyKey} (= {Number(1.0 / store.rates.get(currencyKey)).toLocaleString(undefined, { style: "currency", currency: store.currency })})</option>)}
			</select>
			<button type="reset">Reset</button>
			<button type="submit">Submit</button>
		</details>
	</form>
});

export default CustomerOptions;
