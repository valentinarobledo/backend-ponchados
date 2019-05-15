module.exports = function(app, db){
	const router = app.Router();

	const controller =require("../controllers/question")(app, db);
	const validations= require("../validations/question")(app, db);


	router.post("/question", validations.store, controller.store);
	router.post("/editQuestion", validations.editQuestion, controller.editQuestion);
	router.post("/select", validations.select, controller.select);
	router.post("/create", validations.create, controller.create);


	return router;


}