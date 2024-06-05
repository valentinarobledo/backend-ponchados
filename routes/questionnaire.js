module.exports = function(app, db){
	const router = app.Router(); 

	const controller =require("../controllers/questionnaire")(app, db);
	const validations= require("../validations/questionnaire")(app, db);

	router.post("/create", validations.create, controller.create);
	router.get("/getQuestionnaires", validations.getQuestionnaires, controller.getQuestionnaires);
	router.delete("/delete", validations.delete, controller.delete);
	router.get("/getQuestions", validations.getQuestions, controller.getQuestions);
	router.get("/detail", validations.detail, controller.detail);
}