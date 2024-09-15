import Users from "../database/users";

/**
 * Reducer for the user context.
 *
 * The reducer accepts the following actions:
 *
 * - "TRY_LOGIN": Tries to log in a user with the given username and password.
 *   If the username is invalid, an alert is shown with the expected usernames.
 *   If the password is invalid, an alert is shown with the expected password.
 *   If the login is successful, an alert is shown with a welcome message and the user object is returned.
 *   Otherwise, the current state is returned.
 * - "LOGOUT": Logs out the user by returning null.
 * - "SET_CURRENCY": Sets the user's preferred currency to the given value.
 *
 * @param {object} state - The current state of the user context.
 * @param {object} action - An object containing the type and value of the action.
 * @returns {object} The new state of the user context.
 */
const UserReducer = (state, action) => {
	let user; // SEE: eslint(no-case-declarations)
	const usernames = [...Users.values()].map(user => user.username).join(", ");
	switch (action.type) {
		case "TRY_LOGIN":
			user = Users.get(action.value.username);
			if (!user) {
				if (import.meta.env.DEV) {
					alert(
						`Invalid username (expected one of: ${usernames}, received: ${action.value.password})`
					);
				}

			} else if (user.password !== action.value.password) {
				if (import.meta.env.DEV) {
					alert(
						`Incorrect password (expected: ${user.password}, received: ${action.value.password})`
					);
				}
			} else {
				alert(`Welcome ${user.name}!`); // TODO: Triggered twice because of React Strict Mode(?)
				return user;
			}
			return state;
		case "LOGOUT":
			return null;
		case "SET_CURRENCY":
			return { ...state, currency: action.value };
		default:
			return state;
	}
};

export default UserReducer;
