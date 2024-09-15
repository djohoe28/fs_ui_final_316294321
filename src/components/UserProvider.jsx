import { useReducer } from "react";
import UserContext from "../modules/UserContext";
import UserReducer from "../modules/UserReducer";

/**
 * Provides a UserContext to the application,
 * giving access to the current user and a dispatcher to change it.
 *
 * The initial user is null, but this can be changed via the dispatcher.
 *
 * @param {ReactNode} props.children - The children to render with the UserContext.
 *
 * @returns {JSX.Element} The UserProvider component.
 */
const UserProvider = (props) => {
	const [state, dispatch] = useReducer(UserReducer, null);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserProvider;
