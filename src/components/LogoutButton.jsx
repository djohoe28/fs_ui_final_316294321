import { useCallback, useContext } from "react"
import UserContext from "../modules/UserContext"

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