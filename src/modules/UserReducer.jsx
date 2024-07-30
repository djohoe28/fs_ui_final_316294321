import { values } from "mobx";
import Users from "../database/users";

const UserReducer = (state, action) => {
	console.log(action);
	let user; // SEE: eslint(no-case-declarations)
	const usernames = values(Users).map(user => user.username).join(", ");
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
