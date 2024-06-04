module.exports = function(app, db){
	const router = app.Router();

	const controller =require("../controllers/group")(app, db);
	const validations= require("../validations/group")(app, db);


	router.post("/create", validations.create, controller.create);
	router.post("/add", controller.add);
	router.post("/edit", validations.edit, controller.edit);
	router.get("/list", validations.list, controller.list);
	router.get("/view", validations.students, controller.students);
	router.delete("/delete", validations.delete, controller.delete);
	router.delete("/deleteStudent", validations.deleteStudent, controller.deleteStudent);

	


	return router;


}
