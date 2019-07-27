module.exports = function(express, db){
	return function (req, res, next) {
		let queryBuilder = {
			where: {
				id: {$eq: req.body.id}
			}
		}

		db.User.findOne(queryBuilder).then( user => {

			if(rolId==3){
				return res.status(404).json({message: "Sin autorización"});
			}

			req.user= user;
			next();


		})
	}
}