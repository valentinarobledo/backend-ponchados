module.exports = function(express, db){
	return function (req, res, next) {
		var token = req.headers.authorization.split(" ")[1]; 


		var queryBuilder={
			where: {
				token: { $eq: token }
			}
		};
		db.User.findOne(queryBuilder).then(user=>{
			if(!user) return res.status(401).json({message: 'Sin autorización'});

			req.user = user;
			next();
		})

		.catch(err =>{
			res.status(401).json({message: 'Sin autorización'});
		});
	}
}
