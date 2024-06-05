module.exports = function(app, db){
	const router = app.Router();

	const controller =require("../controllers/group")(app, db);
	const validations= require("../validations/group")(app, db);

	router.get("/students", validations.students, controller.students);
	router.post("/create", validations.create, controller.create);
	router.put("/add", validations.add, controller.add);
	router.put("/edit", validations.edit, controller.edit);
	router.get("/list", validations.list, controller.list);
	router.delete("/delete", validations.delete, controller.delete);
	router.put("/deleteStudent", validations.deleteStudent, controller.deleteStudent);

	return router;
}
