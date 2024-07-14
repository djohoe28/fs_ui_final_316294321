import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const HomePage = () => (
	<>
		<Navbar />
		<div className="nav_main_content">
			<Outlet />
		</div>
	</>
);

export default HomePage;
