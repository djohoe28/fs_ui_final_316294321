import { useContext } from "react";
import ThemeContext from "../modules/ThemeContext";

/**
 * A button component that toggles the theme context when clicked.
 *
 * When clicked, this component dispatches a "TOGGLE" action to the ThemeContext.
 *
 * @returns {JSX.Element} The ThemeControl component.
 */
const ThemeControl = function ThemeControl() {
	const themeContext = useContext(ThemeContext);
	return (
		<button
			onClick={() => themeContext.dispatch({ type: "TOGGLE" })}
		>
			Current Mode: {themeContext.state}
		</button>
	);
};

export default ThemeControl;
