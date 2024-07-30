import { observer } from "mobx-react";
import { useContext, useMemo } from "react";
import UserContext from "../modules/UserContext";
import store from "./MyStore";

/**
 * This component is used to dereference object values as late as possible.
 *
 * This way, we "postpone" using {@link observer} components in the app, leading to less re-renders.
 *
 * @see https://mobx.js.org/react-optimizations.html#function-props-
 */
const PriceDisplay = observer(function PriceDisplay({ getPrice }) {
    const userContext = useContext(UserContext);
    const currency = useMemo(() => userContext.state?.currency ?? "USD", [userContext.state?.currency]);
    const price = getPrice(); // TODO: Memoize? (Does this memoize in TextDisplay?)
    const convertedPrice = price * store.rates.get(currency);
    const convertedPriceLocalized = convertedPrice.toLocaleString(undefined, { style: "currency", currency: currency });
    
	return <>{convertedPriceLocalized}</>;
});

export default PriceDisplay;
