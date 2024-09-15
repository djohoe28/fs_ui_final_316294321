import { useContext } from "react"
import UserContext from "../modules/UserContext"
import AdminOptions from "./AdminOptions";
import CustomerOptions from "./CustomerOptions";
import LogoutButton from "./LogoutButton";
import { Navigate } from "react-router-dom";


/**
 * UserOptions component.
 * 
 * UserOptions appears for all *registered* users (regardless of type),
 * whereas AdminOptions appears for all *admin* users
 * 
 * @description This component provides a dropdown menu for users to access their account settings.
 * @uses UserContext MobX store to retrieve the user's authentication status.
 * @return {JSX.Element} The UserOptions component, including the dropdown menu and logout button.
 */
const UserOptions = () => {
	const userContext = useContext(UserContext);

	return !userContext.state ? <Navigate to="../login" /> : <div className="user-options">
		{userContext.state && userContext.state.type === "admin" ? <AdminOptions /> : <></>}
		<CustomerOptions />
		<LogoutButton />
	</div>
}

export default UserOptions;