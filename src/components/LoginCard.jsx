import { useCallback, useContext, useState } from "react";
import UserContext from "../modules/UserContext";
import Users from "../database/users";
// import TextDisplay from "./TextDisplay";

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
		[setPasswordInputState]
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
		[userContext, usernameInputState, passwordInputState]
	);

	const handleReset = useCallback(
		(e) => {
			e.preventDefault();
			setUsernameInputState("");
			setPasswordInputState("");
			userContext.dispatch({ type: "LOGOUT" });
		},
		[userContext]
	);

	// Render
	return (
		<form onSubmit={handleSubmit} onReset={handleReset}>
			<h1>Login</h1>
			<p>
				Current User:{" "}
				{/* <TextDisplay
					getText={() => userContext.state?.name ?? "null"}
				/> {// TODO: Not an observer? */}
				{userContext.state?.name ?? "null"}
			</p>
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
			<button type="reset">Logout</button>
		</form>
	);
};

export default LoginCard;
