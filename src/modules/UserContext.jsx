import { createContext } from "react";
import UserReducer from "./UserReducer";

var state = null;
const UserContext = createContext({
	state: state,
	dispatch: (action) => UserReducer(state, action),
});

export default UserContext;
