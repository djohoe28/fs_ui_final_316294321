const UserReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			// TODO: Verify against local database.
			return action.value;
		case "LOGOUT":
			return null;
		default:
			return state;
	}
};

export default UserReducer;
