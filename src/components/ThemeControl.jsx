import { useContext } from "react";
import ThemeContext from "../modules/ThemeContext";
import TextDisplay from "./TextDisplay";
import { observer } from "mobx-react";

const ThemeControl = observer(function ThemeControl() {
	const themeContext = useContext(ThemeContext);
	return (
		<div>
			<button
				onClick={() =>
					themeContext.dispatch({
						type: "TOGGLE",
					})
				}
			>
				Current Mode: <TextDisplay getText={() => themeContext.state} />
			</button>
		</div>
	);
});

export default ThemeControl;
