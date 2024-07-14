import { useReducer } from "react";
import ThemeContext from "../modules/ThemeContext";
import ThemeReducer from "../modules/ThemeReducer";

const ThemeProvider = (props) => {
	const [state, dispatch] = useReducer(ThemeReducer, "light");
	return (
		<ThemeContext.Provider value={{ state, dispatch }}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
