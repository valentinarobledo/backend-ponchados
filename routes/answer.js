module.exports = function(app, db){
	const router = app.Router();

	const controller =require("../controllers/answer")(app, db);
	const validations = require("../validations/answer")(app, db);


	//router.post("/store", validations.store, controller.store);
	router.post("/editAnswer", validations.editAnswer, controller.editAnswer);


	return router;


}