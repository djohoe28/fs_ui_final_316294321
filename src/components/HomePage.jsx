import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import UserProvider from "./UserProvider";
import ThemeProvider from "./ThemeProvider";
import AdminOptions from "./AdminOptions";

const HomePage = () => (
	<UserProvider>
		<ThemeProvider>
			<Navbar />
			<div className="nav_user_options">
				<AdminOptions />
			</div>
			<div className="nav_main_content">
				<Outlet />
			</div>
			<footer className="nav_footer_credits">
				<p>Credits</p>
				<a href="https://www.telhai.tech/">Made for Tel Hai Engineering</a>
				<a href="https://pokeapi.co/">Data by PokeAPI</a>
				<a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
			</footer>
		</ThemeProvider>
	</UserProvider>
);

export default HomePage;
