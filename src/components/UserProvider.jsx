import { useReducer } from "react";
import UserContext from "../modules/UserContext";
import UserReducer from "../modules/UserReducer";

const UserProvider = (props) => {
	const [state, dispatch] = useReducer(UserReducer, null);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserProvider;
