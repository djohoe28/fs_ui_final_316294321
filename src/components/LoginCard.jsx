import { useCallback, useContext, useState } from "react";
import UserContext from "../modules/UserContext";
import Users from "../database/users";
import { Navigate } from "react-router-dom";
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
			// TODO: Triggered twice because of React Strict Mode(?)
			// NOTE: Dispatch takes care of data validation.
			userContext.dispatch({
				type: "TRY_LOGIN",
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
		userContext.state ? <Navigate to="../options" /> :
			<form onSubmit={handleSubmit} onReset={handleReset}>
				<h1>Login</h1>
				<p>
					Available Users: [{[...Users.keys()].join(", ")}]; (password is same as username)
				</p>
				<p>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={usernameInputState}
						onChange={handleUsernameChange}
					/>
				</p>
				<p>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={passwordInputState}
						onChange={handlePasswordChange}
					/>
				</p>
				<p>
					<button type="submit">Login</button>
					<button type="reset">Reset</button>
				</p>
			</form>
	);
};

export default LoginCard;
