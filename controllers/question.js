module.exports = function(express, db){
	return {

		store: async function (req, res){
			try {
				console.log(req.body	)
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
						questionId: question.id
					});
				}
				await db.Answer.bulkCreate(data);
				return res.json({message: "La pregunta ha sido creada"});
				console.log(question);
			}
			 catch(err) {
				console.log( err );
				return res.status(400).json({message: "Something went wrong"});
			}
		},

		editQuestion: async function(req, res){
			console.log(req.body);
			try{
				let queryBuilder= {
					where: {
						id: {$eq: req.body.id}
					}
				}
				let question = await db.Question.findOne(queryBuilder);
				await question.update({
					question: req.body
				});				
				return res.json({message: "Pregunta ha sido editada"});
			}
			catch(err){
				console.log( err );
				return res.status(400).json({message: "Something went wrong"});
			}
		},
		editAnswer: async function(){
			try{
				let ans = req.body.answer;
				let queryBuilder =  {
					where: {
						id: {$eq: req.body.id}
					}
				};

				let answer = await db.Answer.findOne(queryBuilder)
				await answer.update({
					answer: ans
				})
				return res.json({message:"Respuesta editada"})
			}
			catch(err){
				console.log(err);
				return res.status(400).json({message: "Something went wrong"});
			}
		},

		list: async function(req, res){
			try{
				let queryBuilder = {
					include: [{
						model: db.Answer,
						required: true
					}],
					where: {
					}
				}
				let questions = await db.Question.findAll(queryBuilder);
				return res.json(questions);							
			}catch(err){
				console.log( err );
				return res.status(400).json({message: "Something went wrong"});
			}
		},

		//Create questionnaire

		create: async function(req, res){
		 	try{		 		
		 		let name = req.body.name;		 		
		 		let queryBuilder = {
		 			where: {
		 				name: { $eq: req.body.name }
		 			}
		 		}
		 		let questionnaire = await db.User.findOne(queryBuilder);
		 		if (!questionnaire) {
			 		let name = req.body.name;
			 		let data = {
			 			name
			 		};			 
			 		questionnaire = await db.Questionnaire.create(data);
			 		return res.json({message: "Cuestionario creado"})
		 		} else {
		 			return res.status(400).json({message: "El cuestionario ya existe"})
		 		}
		 	}
		 	catch(err){
		 		console.log( err );
				return res.status(400).json({message: "Something went wrong"});
		 	}
		},
		questionnaire: async function(req, res){
			try{			
				let json = [];
				let questionnaires = await db.Questionnaire.findAll();
				for (var i = 0; i <= questionnaires.length - 1; i++) {
					let questions = await db.Question.findAll({
						where: {
							questionnaireId: { $eq: questionnaires[i].id }
						}
					});
					let data = {
						id: questionnaires[i].id,
						name: questionnaires[i].name,
						questions: questions.length
					}
					json.push(data);
				}
				return res.json(json);					
			} catch(err) {
				console.log( err );
				return res.status(400).json({message: "Something went wrong"});
			}
		},
		delete: async function(req, res){
			console.log(req.body);
			try{
				let queryBuilder = {
					where: {
						id: {$eq: req.body.id}
					}
				}
				let questionnaire = await db.Questionnaire.findOne(queryBuilder);
				await questionnaire.destroy();
				return res.json({message:"Cuestionario eliminado"});
			}	catch(err) {
				console.log(err);
				return res.status(400).json({message: "Something went wrong"});
			}
		},
		view: async function(req, res){
			try{
				let queryBuilder = {
					include: [{
						model: db.Answer,
						required: true
					}],
					where: {
						id: {$eq: req.body.id}
					}
				}
				let questions = await db.Question.findAll(queryBuilder);
				return res.json(questions);							
			}catch(err){
				console.log( err );
				return res.status(400).json({message: "Something went wrong"});
			}
		}
	}
}
