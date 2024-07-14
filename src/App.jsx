import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />}>
					<Route path="/login" />
					<Route path="/inventory" />
					<Route path="/cart" />
					<Route path="*" />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
