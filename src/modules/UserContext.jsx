import { createContext } from "react";
import UserReducer from "./UserReducer";

const UserContext = createContext({ state: null, dispatch: UserReducer });

export default UserContext;
