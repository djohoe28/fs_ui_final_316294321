const ThemeReducer = (state, action) => {
	switch (action.type) {
		case "LIGHT":
			return "light";
		case "DARK":
			return "dark";
		case "TOGGLE":
			return state === "light" ? "dark" : "light";
		case "SYSTEM":
			// SEE: https://stackoverflow.com/questions/61117608/how-do-i-set-system-preference-dark-mode-in-a-react-app-but-also-allow-users-to
			const mediaQuery = "(prefers-color-scheme: dark)";
			const isDarkModePreferred = window.matchMedia(mediaQuery).matches;
			return isDarkModePreferred ? "dark" : "light";
		default:
			return state;
	}
};

export default ThemeReducer;
