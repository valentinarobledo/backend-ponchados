module.exports = function(express, db){
	return {

		store: async function (req, res){
			try {
				let user = req.user;
				let question = await db.Question.create({
					question: req.body.question
				});

				let answers = req.body.answers;

				let data = [];
				for (var i = answers.length - 1; i >= 0; i--) {
					data.push({
						answer: answers[i].text,
						correct: answers[i].correct,
						quiestionId: question.id
					});
				}
				await db.Answer.bulkCreate(data);

				return res.json({message: "Question have been created"});
				console.log(question);

			}
			 catch(err) {
				console.log( err );
				return res.status(400).json({message: "Something went wrong"});
			}
		},

		editQuestion: async function(req, res){
			try{

				let question = req.question;
				let user = req.user;
				
				// rolId student = 3, techer = 2,admin = 1
				if(user.rolId == 3) return res.status(400).json({message: "Permission denied"});

				let text = req.body.question;

				await question.update({
					question: text
				})

				return res.json({message: "Question has been edited"});

			}

			catch(err){
				console.log( err );
				return res.status(400).json({message: "Something went wrong"});
			}
		},

		select: async function(req, res){
			try{

				let question = req.question;
				let user = req.user;
				
				// rolId student = 3, techer = 2,admin = 1
				if(user.rolId == 3) return res.status(400).json({message: "Permission denied"});

				let select = req.body.selected;

				await question.update({
					selected: select
				})

				return res.json({message: "question has been select"});

			}

			catch(err){
				console.log( err );
				return res.status(400).json({message: "Something went wrong"});
			}
		},

		create: async function(req, res){
		 	try{
		 		
		 		let user = req.user;
		 		let name = req.body.question;
		 		
		 		let queryBuilder = {
		 			where: {
		 				name: { $eq: name }
		 			}
		 		}
		 		let questionnaire = await db.User.findOne(queryBuilder);

		 		if (!name) {

					let name = req.body.name;
			 		let questionId = req.body.questionId;
			 		let answerId = req.body.answerId;
				 		 /*	let data = [];
							for (var i = answers.length - 1; i >= 0; i--) {
							data.pull({
							answer: answers[i].text,
							correct: answers[i].correct,
							quiestionId: question.id
							});
							}*/
			 		let groupId = req.body.groupId;
			 		let active = req.body.active;
			
			 		let data = {
			 			name,
			 			questionId,
			 			answerId,
			 			groupId,
			 			active
			 		};

			 		questionnaire = await db.Questionnaire.create(data);

			 		return res.json({message: "Cuestionario creado"})
		 		} else {
		 			return res.status(400).json({message: "Cuestionario existente"})
		 		}
		 	}
		 	catch(err){
		 		console.log( err );
				return res.status(400).json({message: "Something went wrong"});
		 	}
		}

	}
}