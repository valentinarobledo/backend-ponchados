module.exports = function (app, db) {
	var checkAuth = require("../middleware/check-auth")(app, db);
	var checkUser = require("../middleware/check-user")(app, db);
	var checkQuestion = require("../middleware/check-question")(app, db);

	return {
		store: [
		],
		editQuestion: [
			checkAuth,
			checkQuestion
		],

		list: [
			checkAuth
		],

		create: [
			checkAuth
		],

		addQuestion: [
			checkAuth
		]

	}
} 