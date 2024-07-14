import { useCallback, useContext } from "react";
import UserContext from "../modules/UserContext";

const LoginCard = () => {
	const userContext = useContext(UserContext);
	const [usernameInputState, setUsernameInputState] = useState("");
	const handleChange = useCallback(
		(e) => {
			setUsernameInputState(e.target.value);
		},
		[setUsernameInputState]
	);
	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			// NOTE: Dispatch takes care of data validation.
			userContext.dispatch(userContext.state, {
				type: "LOGIN",
				value: {
					username: usernameInputState,
				},
			});
		},
		[usernameInputState]
	);
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="username"
				value={usernameInputState}
				onChange={handleChange}
			/>
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginCard;
