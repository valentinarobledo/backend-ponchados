module.exports = function(app, db){
	const router = app.Router();

	const controller =require("../controllers/question")(app, db);
	const validations= require("../validations/question")(app, db);


	router.post("/question", validations.store, controller.store);
	router.post("/editQuestion", controller.editQuestion);
	router.post("/list", validations.list, controller.list);
	router.post("/create", validations.create, controller.create);
	router.post("/store", validations.store, controller.store);
	router.post("/questionnaire", controller.questionnaire);
	router.post("/editAnswer", controller.editAnswer);
	router.post("/delete", controller.delete);
	router.post("/view", controller.view);



	return router;


}