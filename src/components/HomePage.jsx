import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import UserProvider from "./UserProvider";
import ThemeProvider from "./ThemeProvider";

const HomePage = () => (
	<UserProvider>
		<ThemeProvider>
			<Navbar />
			<div className="nav_main_content">
				<Outlet />
			</div>
		</ThemeProvider>
	</UserProvider>
);

export default HomePage;
