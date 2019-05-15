module.exports = function(express, db){
	return function (req, res, next) {

		let queryBuilder = {
			where: {
				id: {$eq: req.body.id}
			}
		}

		db.Question.findOne(queryBuilder).then( question => {

			if(!question){
				return res.status(404).json({message: "Question doesn't find"});
			}

			req.question = question;
			next();
		}).catch(err =>{
			res.status(401).json({message: 'Somthing went wrong'});
		});
	}
}