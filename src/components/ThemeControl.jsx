import { useContext } from "react";
import ThemeContext from "../modules/ThemeContext";
// import TextDisplay from "./TextDisplay";
// import { observer } from "mobx-react"; // NOTE: Not an observer.

const ThemeControl = function ThemeControl() {
	const themeContext = useContext(ThemeContext);
	return (
		<button
			onClick={() =>
				themeContext.dispatch({
					type: "TOGGLE",
				})
			}
		>
			{/* Current Mode: <TextDisplay getText={() => themeContext.state} /> // TODO: Not an observer? */}
			Current Mode: {themeContext.state}
		</button>
	);
};

export default ThemeControl;
