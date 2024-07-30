import { useContext } from "react"
import UserContext from "../modules/UserContext"
import AdminOptions from "./AdminOptions";
import CustomerOptions from "./CustomerOptions";

// NOTE:	UserOptions appears for all *registered* users (regardless of type)
// 			AdminOptions appears for all *admin* users
const UserOptions = () => {
	const userContext = useContext(UserContext);
	return <>
		{userContext.state && userContext.state.type === "admin" ? <AdminOptions /> : <></>}
		{userContext.state ? <CustomerOptions /> : <></>}
	</>
}

export default UserOptions;