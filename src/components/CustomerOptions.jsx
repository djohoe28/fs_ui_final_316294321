import { useCallback, useContext, useState } from "react";
import { observer } from "mobx-react";
import store from "../modules/MyStore";
import { keys } from "mobx";
import UserContext from "../modules/UserContext";
import ResetButton from "./ResetButton";
import SubmitButton from "./SubmitButton";

const CustomerOptions = observer(function CustomerOptions() {
	const userContext = useContext(UserContext);
	const [state, setState] = useState(store.defaultCurrency);
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
				{keys(store.rates).map(currencyKey => {
					const reverseRate = Number(1.0 / store.rates.get(currencyKey)); // NOTE: `1 ${state} = ${reverseRate} ${store.defaultCurrency}`
					const reverseRateString = reverseRate.toLocaleString(undefined, { style: "currency", currency: store.defaultCurrency });
					return <option key={currencyKey} value={currencyKey}>{currencyKey} (= {reverseRateString})</option>
				})}
			</select>
			<ResetButton text="Reset" />
			<SubmitButton text="Submit" />
		</details>
	</form>
});

export default CustomerOptions;
