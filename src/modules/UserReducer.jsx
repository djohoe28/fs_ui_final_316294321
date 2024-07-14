import Users from "../database/users";

const UserReducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case "LOGIN":
			const user = Users.get(action.value.username);
			if (!user) {
				const users = [...Users.keys()].join(", ");
				alert(
					`Invalid username (expected one of: ${users}, received: ${action.value.password})`
				);
			} else if (user.password !== action.value.password) {
				alert(
					`Incorrect password (expected: ${user.password}, received: ${action.value.password})`
				);
			} else {
				alert(`Welcome ${user.name}!`);
				return user;
			}
			return state;
		case "LOGOUT":
			return null;
		default:
			return state;
	}
};

export default UserReducer;
