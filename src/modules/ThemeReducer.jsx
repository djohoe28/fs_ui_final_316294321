/**
 * Reducer for the theme context.
 *
 * The theme context is used to set the color scheme of the application.
 *
 * The reducer accepts the following actions:
 *
 * - "LIGHT": Sets the theme to light.
 * - "DARK": Sets the theme to dark.
 * - "TOGGLE": Toggles the theme between light and dark.
 * - "SYSTEM": Sets the theme to the system preference (if available).
 *
 * The reducer returns the new state of the theme context, which is either "light" or "dark".
 *
 * @param {string} state - The current state of the theme context.
 * @param {object} action - An object containing the type and value of the action.
 * @returns {string} The new state of the theme context.
 */
const ThemeReducer = (state, action) => {
	let _state;
	let mediaQuery, isDarkModePreferred; // SEE: eslint(no-case-declarations)
	switch (action.type) {
		case "LIGHT":
			_state = "light";
			break;
		case "DARK":
			_state = "dark";
			break;
		case "TOGGLE":
			_state = state === "light" ? "dark" : "light";
			break;
		case "SYSTEM":
			// SEE: https://stackoverflow.com/questions/61117608/how-do-i-set-system-preference-dark-mode-in-a-react-app-but-also-allow-users-to
			mediaQuery = "(prefers-color-scheme: dark)"; 
			isDarkModePreferred = window.matchMedia(mediaQuery).matches;
			_state = isDarkModePreferred ? "dark" : "light";
			break;
		default:
			return state; // NOTE: Immediate `return` because no changes should be made(?)
	}
	document.body.classList.toggle("dark-mode", _state === "dark"); // NOTE: Could've been an Effect, but this is a Reducer, so why not.
	return _state;
};

export default ThemeReducer;
