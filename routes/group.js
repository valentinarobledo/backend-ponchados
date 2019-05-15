module.exports = function(app, db){
	const router = app.Router();

	const controller =require("../controllers/group")(app, db);
	const validations= require("../validations/group")(app, db);


	router.post("/create", validations.create, controller.create);
	router.post("/add", validations.add, controller.add);
	router.post("/edit", validations.edit, controller.edit);

	


	return router;


}
