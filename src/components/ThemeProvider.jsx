import { useReducer } from "react";
import ThemeContext from "../modules/ThemeContext";
import ThemeReducer from "../modules/ThemeReducer";

/**
 * Provides a ThemeContext to the application,
 * giving access to the current theme and a dispatcher to change it.
 *
 * The initial theme is "light", but this can be changed via the dispatcher.
 *
 * @param {ReactNode} props.children - The children to render with the ThemeContext.
 *
 * @returns {JSX.Element} The ThemeProvider component.
 */
const ThemeProvider = (props) => {
	const [state, dispatch] = useReducer(ThemeReducer, "light");
	return (
		<ThemeContext.Provider value={{ state, dispatch }}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
