module.exports = function (app, db) {
	var checkAuth = require("../middleware/check-auth")(app, db);
	var checkUser = require("../middleware/check-user")(app, db);
	var checkAnswer = require("../middleware/check-answer")(app, db);

	return {
		store: [
		],
		editAnswer: [
			checkAuth,
			checkAnswer
		]
	}
} 