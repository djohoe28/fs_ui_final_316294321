import { useContext } from "react"
import UserContext from "../modules/UserContext"
import AdminOptions from "./AdminOptions";
import CustomerOptions from "./CustomerOptions";
import LogoutButton from "./LogoutButton";
import { Navigate } from "react-router-dom";

// NOTE:	UserOptions appears for all *registered* users (regardless of type)
// 			AdminOptions appears for all *admin* users
const UserOptions = () => {
	const userContext = useContext(UserContext);

	return !userContext.state ? <Navigate to="../login" /> : <div className="user-options">
		{userContext.state && userContext.state.type === "admin" ? <AdminOptions /> : <></>}
		<CustomerOptions />
		<LogoutButton />
	</div>
}

export default UserOptions;