import { useCallback, useContext } from "react"
import UserContext from "../modules/UserContext"

/**
 * A button component that logs the user out when clicked.
 *
 * When clicked, this component dispatches a "LOGOUT" action to the UserContext.
 *
 * @returns {JSX.Element} The LogoutButton component.
 */
const LogoutButton = () => {
    const userContext = useContext(UserContext);
    const handleClick = useCallback(
		(event) => {
			event.preventDefault();
			userContext.dispatch({ type: "LOGOUT" });
		},
		[userContext]
	);
    return <button onClick={handleClick}>Logout</button>
}

export default LogoutButton;