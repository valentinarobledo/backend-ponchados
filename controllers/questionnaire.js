module.exports = function (express, db) {
	return {
		//Create questionnaire
		create: async function (req, res) {
			try {
				let name = req.body.name;
				let queryBuilder = {
					where: {
						name: { $eq: req.body.name },
					},
				};
				let questionnaire = await db.User.findOne(queryBuilder);
				if (!questionnaire) {
					let name = req.body.name;
					let data = {
						name,
					};
					questionnaire = await db.Questionnaire.create(data);
					return res.json({ message: "Questionnaire created" });
				} else {
					return res.status(400).json({ message: "Questionnaire already exists" });
				}
			} catch (err) {
				console.log(err);
				return res.status(400).json({ message: "Something went wrong" });
			}
		},
		//View list questionnaire details
		getQuestionnaires: async function (req, res) {
      try {
        let json = [];
        let questionnaires = await db.Questionnaire.findAll();
        for (var i = 0; i <= questionnaires.length - 1; i++) {
          let questions = await db.Question.findAll({
            where: {
              questionnaireId: { $eq: questionnaires[i].id },
            },
          });
          let data = {
            id: questionnaires[i].id,
            name: questionnaires[i].name,
            questions: questions.length,
            file: questionnaires[i].file,
          };
          json.push(data);
        }
        return res.json(json);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },
		//Delete questionnaire
		delete: async function (req, res) {
      console.log(req.body);
      try {
        let queryBuilder = {
          where: {
            id: { $eq: req.body.id },
          },
        };
        let questionnaire = await db.Questionnaire.findOne(queryBuilder);
        await questionnaire.destroy();
        return res.json({ message: "Questionnaire deleted" });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },
		//TODO: Revisar si se cumple dentro de controller question
		//View questions of a questionnaire
		getQuestions: async function (req, res) {
      try {
        let queryBuilder = {
          where: {
            questionnaireId: { $eq: req.body.id },
          },
        };
        let q = await db.Question.findOne(queryBuilder);
        return res.json(q);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },
		//View questionnaire detail
		detail: async function (req, res) {
      try {
        let queryBuilder = {
          where: {
            id: { $eq: req.body.id },
          },
        };
        let show = await db.Questionnaire.findOne(queryBuilder);
        return res.json(show);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },

		//TODO: 1. Metodo tiempo disponible para responder cuestionario
		//TODO: 2. Traer preguntas y respuestas de un cuestionario 
		//TODO: 3. Detalle de todo el cuestionario
		
	}
};