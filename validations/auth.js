module.exports = function (app, db) {
	var checkUser = require("../middleware/check-user")(app, db);

	return {
		login: [
			checkUser

		]
	}
} 