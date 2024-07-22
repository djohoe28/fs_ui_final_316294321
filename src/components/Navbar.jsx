import { Link } from "react-router-dom";
import ThemeControl from "./ThemeControl";
import ImageDisplay from "./ImageDisplay";
import MyStore from "./MyStore";

const Navbar = () => (
	<nav className="navbar">
		<ImageDisplay getSrc={() => MyStore.logoBlobSrc} />
		<Link to="login">Login</Link>
		<Link to="inventory">Inventory</Link>
		<Link to="cart">Cart</Link>
		<ThemeControl />
	</nav>
);

export default Navbar;
