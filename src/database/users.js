const Users = new Map([
	[
		"admin",
		{
			username: "admin",
			password: "admin",
			name: "Administrator",
			type: "admin",
			currency: "USD",
		},
	],
	[
		"user",
		{
			username: "user",
			password: "user",
			name: "John Smith",
			type: "user",
			currency: "ILS",
		},
	],
]);

export default Users;
