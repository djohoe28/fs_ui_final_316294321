import { useCallback, useContext, useState } from "react";
import UserContext from "../modules/UserContext";
import Users from "../database/users";

const LoginCard = () => {
	// External States & Contexts
	const userContext = useContext(UserContext);

	// Local States
	const [usernameInputState, setUsernameInputState] = useState("");
	const [passwordInputState, setPasswordInputState] = useState("");

	// Callbacks
	const handleUsernameChange = useCallback(
		(e) => {
			setUsernameInputState(e.target.value);
		},
		[setUsernameInputState]
	);

	const handlePasswordChange = useCallback(
		(e) => {
			setPasswordInputState(e.target.value);
		},
		[passwordInputState, setPasswordInputState]
	);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			// NOTE: Dispatch takes care of data validation.
			userContext.dispatch({
				type: "LOGIN",
				value: {
					username: usernameInputState,
					password: passwordInputState,
				},
			});
		},
		[usernameInputState, passwordInputState]
	);

	// Render
	return (
		<form onSubmit={handleSubmit}>
			<h1>Login</h1>
			<p>Current User: {userContext.state?.name ?? "null"}</p>
			<p>
				Available Users: [{[...Users.keys()].join(", ")}]; (password =
				username)
			</p>
			<label htmlFor="username">Username:</label>
			<input
				type="text"
				name="username"
				placeholder="Username"
				value={usernameInputState}
				onChange={handleUsernameChange}
			/>
			<label htmlFor="password">Password:</label>
			<input
				type="password"
				name="password"
				placeholder="Password"
				value={passwordInputState}
				onChange={handlePasswordChange}
			/>
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginCard;
