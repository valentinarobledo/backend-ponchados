module.exports = function(express, db){
	return {
/* 		editAnswer: async function(req, res){
			try{

				let answer = req.answer;
				let user = req.user;
				// rolId student = 1, techer = 3,admin = 2
				if(user.rolId == 1) return res.status(400).json({message: "Permission denied"});

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
		} */
		//TODO: Revisar flujo
		editAnswer: async function (req, res) {
      try {
        console.log(req.body);
        let queryBuilder = {
          where: {
            id: { $eq: req.body.id },
          },
        };
        let ans = await db.Answer.findOne(queryBuilder);
        await ans.update({
          answer: req.body.answer,
        });
        return res.json({ message: "Answer has been edited" });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },
	}
}