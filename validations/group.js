module.exports = function (app, db) {
	var checkAuth = require("../middleware/check-auth")(app, db);

	return {
		
		create: [
			checkAuth
		],

		add: [
			checkAuth
		],

		edit: [
			checkAuth
		]
	}
} 