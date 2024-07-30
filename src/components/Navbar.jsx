import { Link } from "react-router-dom";
import ThemeControl from "./ThemeControl";
import ImageDisplay from "./ImageDisplay";
import store from "./MyStore";
import { useContext } from "react";
import UserContext from "../modules/UserContext";

const Navbar = () => {
	const userContext = useContext(UserContext);
	return (
		<nav className="navbar">
			<ImageDisplay getSrc={() => store.logoBlobSrc} />
			<Link to="login">Login</Link>
			<Link to="inventory">Inventory</Link>
			<Link to="cart">Cart</Link>
			<ThemeControl />
			Welcome {userContext.state?.name ?? ""}!
		</nav>
	)
};

export default Navbar;
