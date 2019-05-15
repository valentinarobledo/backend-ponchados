module.exports = function(express, db){
	return {
		editAnswer: async function(req, res){
			try{

				let answer = req.answer;
				let user = req.user;
				// rolId student = 3, techer = 2,admin = 1
				if(user.rolId == 3) return res.status(400).json({message: "Permission denied"});

				let text = req.body.answer;

				await answer.update({
					answer: text
				})

				return res.json({message: "Answer has been edited"})

			}

			catch(err){
				console.log( err );
				return res.status(400).json({message: "Something went wrong"});
			}
		}
	}
}