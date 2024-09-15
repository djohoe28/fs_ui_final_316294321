import { createContext } from "react";
import UserReducer from "./UserReducer";

/**
 * Initial user state.
 * @type {null}
 */
var state = null;

/**
 * UserContext module.
 *
 * @description This module creates a context for user management, providing a state and a dispatch function.
 * @return {Object} The UserContext object.
 */
const UserContext = createContext({
	/**
	 * Current user state.
	 * @type {null}
	 */
	state: state,
	/**
	 * Dispatch function for user actions.
	 * @param {Object} action - The action to dispatch.
	 * @return {void}
	 */
	dispatch: (action) => UserReducer(state, action),
});

export default UserContext;
