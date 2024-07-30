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
