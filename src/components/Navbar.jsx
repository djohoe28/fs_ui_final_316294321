import { Link } from "react-router-dom";
import ThemeControl from "./ThemeControl";
import ImageDisplay from "./ImageDisplay";
import store from "../modules/MyStore";
import { useContext } from "react";
import UserContext from "../modules/UserContext";

/**
 * The main navigation bar component.
 *
 * This component displays the main navigation options for the application,
 * including links to the homepage, login page, inventory page, and cart page.
 *
 * The component also displays a link to the user options page if the user is logged in.
 *
 * @returns {JSX.Element} The Navbar component.
 */

const Navbar = () => {
	const userContext = useContext(UserContext);
	return (
		<nav>
			<Link to="/"><ImageDisplay getSrc={() => store.logoBlobSrc} getAlt={() => "Home"} /></Link>
			{userContext.state ? <Link to="options">[{userContext.state?.name}]</Link> : <Link to="login">Login</Link>}
			<Link to="inventory">Inventory</Link>
			{userContext.state ? <Link to="cart">Cart</Link> : <></>}
			<ThemeControl />
			{/* Welcome {userContext.state?.name ?? ""}! */}
		</nav>
	)
};

export default Navbar;
