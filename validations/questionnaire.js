module.exports = function (app, db) {
	const checkAuth = require("../middleware/check-auth")(app, db);
	const CheckRole = require("../middleware/check-role")(app, db);

	return {
		create: [
			checkAuth,
			CheckRole
		],
		getQuestionnaires: [
			checkAuth,
		],
		delete: [
			checkAuth,
			CheckRole
		],
		getQuestions: [
			checkAuth
		],
		detail: [
			checkAuth,
		]
	}
}