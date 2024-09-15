import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import InventoryPage from "./components/InventoryPage";
import LoginCard from "./components/LoginCard";
import CartPage from "./components/CartPage";
import ErrorPage from "./components/ErrorPage";
import UserOptions from "./components/UserOptions";
import TitlePage from "./components/TitlePage";

/**
 * The main entry point for the application.
 *
 * This component provides a provider for the UserContext and ThemeContext,
 * and renders the main layout elements of the application.
 *
 * The component also defines the main routes of the application, including
 * the root route, which renders the TitlePage component.
 *
 * @returns {JSX.Element} The main App component.
 */
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />}>
					<Route path="/" element={<TitlePage />} />
					<Route path="/login" element={<LoginCard />} />
					<Route path="/inventory" element={<InventoryPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/options" element={<UserOptions />} />
					<Route path="*" element={<ErrorPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
