import { useContext } from "react";
import ThemeContext from "../modules/ThemeContext";

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
