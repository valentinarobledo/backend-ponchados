module.exports = function (app, db) {
	var checkAuth = require("../middleware/check-auth")(app, db);

	return {
		
		create: [
			checkAuth
		],

		edit: [
			checkAuth
		],

		list: [
			checkAuth
		],

		students: [
			checkAuth
		],

		delete: [
			checkAuth
		],

		deleteStudent: [
			checkAuth
		]
	}
} 