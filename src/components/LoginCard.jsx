import { useCallback, useContext, useState } from "react";
import UserContext from "../modules/UserContext";
import Users from "../database/users";
import { Navigate } from "react-router-dom";
import ResetButton from "./ResetButton";
import SubmitButton from "./SubmitButton";
// import TextDisplay from "./TextDisplay";

/**
 * A component that displays a login form.
 *
 * If the user is already logged in, the component will redirect them to the options page.
 *
 * The component will dispatch a "TRY_LOGIN" action to the UserContext when the form is submitted.
 *
 * @returns {JSX.Element} The LoginCard component.
 */
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
			alert("Changes submitted!");
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
					<ResetButton text="Reset" />
					<SubmitButton text="Submit" />
				</p>
			</form>
	);
};

export default LoginCard;
