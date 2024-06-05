module.exports = function(app, db){
	const router = app.Router();

	const controller =require("../controllers/question")(app, db);
	const validations= require("../validations/question")(app, db);


	router.post("/question", validations.store, controller.store);
	router.put("/editQuestion", controller.editQuestion);
	router.get("/list", validations.list, controller.list);
	router.post("/create", validations.create, controller.create);
	router.post("/store", validations.store, controller.store);
	router.post("/questionnaire", controller.questionnaire);
	router.post("/editAnswer", controller.editAnswer);
	router.delete("/delete", validations.delete, controller.delete);
	router.get("/view", controller.view);
	router.get("/show", controller.show);



	return router;


}