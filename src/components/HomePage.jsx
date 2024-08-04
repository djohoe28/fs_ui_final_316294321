import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import UserProvider from "./UserProvider";
import ThemeProvider from "./ThemeProvider";
import Footer from "./Footer";

// NOTE:	Personally I would have called this "OutletWrapper" or something,
//			but that's how it shows up in the repository, so let's go with that
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
