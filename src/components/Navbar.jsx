import { Link } from "react-router-dom";
import ThemeControl from "./ThemeControl";

const Navbar = () => (
	<nav className="navbar">
		<Link to="login">Login</Link>
		<Link to="inventory">Inventory</Link>
		<Link to="cart">Cart</Link>
		<ThemeControl />
	</nav>
);

export default Navbar;
