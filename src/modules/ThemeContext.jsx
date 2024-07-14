import { createContext } from "react";
import ThemeReducer from "./ThemeReducer";

const ThemeContext = createContext({ state: "light", dispatch: ThemeReducer });

export default ThemeContext;
