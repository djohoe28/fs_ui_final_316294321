import { createContext } from "react";
import ThemeReducer from "./ThemeReducer";

var state = "light";
const ThemeContext = createContext({
	state: state,
	dispatch: (action) => ThemeReducer(state, action),
});

export default ThemeContext;
