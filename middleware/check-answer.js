module.exports = function(express, db){
	return function (req, res, next) {

		let queryBuilder = {
			where: {
				id: {$eq: req.body.id}
			}
		}

		db.Answer.findOne(queryBuilder).then( answer => {

			if(!answer){
				return res.status(404).json({message: "Answer doesn't find"});
			}

			req.answer = answer;
			next();
		}).catch(err =>{
			res.status(401).json({message: 'Something went wrong'});
		});
	}
}