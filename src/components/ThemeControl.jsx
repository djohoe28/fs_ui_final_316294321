import { useContext } from "react";
import ThemeContext from "../modules/ThemeContext";
import TextDisplay from "./TextDisplay";

const ThemeControl = () => {
	const themeContext = useContext(ThemeContext);
	return (
		<div>
			<button
				onClick={() => {
					themeContext.dispatch(themeContext.state, {
						type: "TOGGLE",
					});
				}}
			>
				Current Mode: <TextDisplay getText={() => themeContext.state} />
			</button>
		</div>
	);
};

export default ThemeControl;
