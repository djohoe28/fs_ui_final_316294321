import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import UserProvider from "./UserProvider";
import ThemeProvider from "./ThemeProvider";
import Footer from "./Footer";

/**
 * The main entry point for the application.
 *
 * The `HomePage` component provides a provider for the UserContext and ThemeContext,
 * and renders the main layout elements of the application.
 *
 * Personally I would have called this "OutletWrapper" or something,
 * but that's how it shows up in the repository, so let's go with that.
 * 
 * @returns {JSX.Element} The main layout elements of the application.
 */

const HomePage = () => (
	<UserProvider>
		<ThemeProvider>
			<Navbar />
			<Outlet />
			<Footer />
		</ThemeProvider>
	</UserProvider>
);

export default HomePage;
