import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import InventoryPage from "./components/InventoryPage";
import LoginCard from "./components/LoginCard";
import CartPage from "./components/CartPage";
import ErrorPage from "./components/ErrorPage";
import UserOptions from "./components/UserOptions";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />}>
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
