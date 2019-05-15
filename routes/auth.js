module.exports = function(app, db){
	var router = app.Router();
	var controller = require("../controllers/auth")(app, db);
	var validator = require("../validations/auth")(app,db);

	router.post("/login", validator.login,  controller.login);

	router.post("/register", controller.register);

	return router;


}



