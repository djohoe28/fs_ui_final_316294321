import { createContext } from "react";
import ThemeReducer from "./ThemeReducer";

/**
 * Initial theme state.
 * @type {string}
 */
var state = "light";

/**
 * ThemeContext module.
 *
 * @description This module creates a context for theme management, providing a state and a dispatch function.
 * @return {Object} The ThemeContext object.
 */
const ThemeContext = createContext({
	/**
	 * Current theme state.
	 * @type {string}
	 */
	state: state,
	/**
	 * Dispatch function for theme actions.
	 * @param {Object} action - The action to dispatch.
	 * @return {void}
	 */
	dispatch: (action) => ThemeReducer(state, action),
});

export default ThemeContext;
