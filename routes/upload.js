module.exports = function(app, db){
	const router = app.Router();

	const controller =require("../controllers/upload")(app, db);
	
	router.post("/destionation", controller.destionation);
	router.post("/filename", controller.filename);
	router.post("/fileFilter", controller.fileFilter);
	
	return router;


}