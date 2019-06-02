module.exports = function(app, db){
	const router = app.Router();

	const controller =require("../controllers/group")(app, db);
	const validations= require("../validations/group")(app, db);


	router.post("/create", validations.create, controller.create);
	router.post("/add", controller.add);
	router.post("/edit", validations.edit, controller.edit);
	router.post("/list", validations.list, controller.list);
	router.post("/view", validations.students, controller.students);
	router.post("/delete", validations.delete, controller.delete);
	router.post("/deleteStudent", validations.deleteStudent, controller.deleteStudent);

	


	return router;


}
