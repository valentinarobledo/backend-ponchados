module.exports = function(express, db){
	return function (req, res, next) {
		let queryBuilder = {
			where: {
				username: {$eq: req.body.username}
			}
		}

		db.User.findOne(queryBuilder).then( user => {

			if(!user){
				return res.status(404).json({message: "Usuario no encontrado"});
			}

			req.user= user;
			next();


		})
	}
}