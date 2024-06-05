module.exports = function (express, db) {
  return {
		//Create questiona and answers
    store: async function (req, res) {
      try {
        console.log(req.body);
        let user = req.user;
        let question = await db.Question.create({
          question: req.body.question,
          userId: req.user.id,
          questionnaireId: req.body.qId,
        });
        let answers = req.body.answers;

        let data = [];
        for (let i = answers.length - 1; i >= 0; i--) {
          data.push({
            answer: answers[i].text,
            correct: answers[i].correct,
            questionId: question.id,
          });
        }
        await db.Answer.bulkCreate(data);
        return res.json({ message: "Question created" });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },
    editQuestion: async function (req, res) {
      try {
        let queryBuilder = {
          where: {
            id: { $eq: req.body.id },
          },
        };
        let ques = await db.Question.findOne(queryBuilder);
        await ques.update({
          question: req.body.question,
          points: req.body.points,
          time: req.body.time,
        });

        return res.json({ message: "Question edited" });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },

		//TODO: Revisar si esta pertenece al controller questionnaire
		//List of ques and answers of a questionnaire
    list: async function (req, res) {
      try {
        let queryBuilder = {
          include: [
            {
              model: db.Answer,
              required: false,
            },
          ],
          where: [{ questionnaireId: { $eq: req.body.qId } }],
        };
        if (req.user.rolId == 1) {
          queryBuilder.where.push({ userId: { $eq: req.user.id } });
        }
        let questions = await db.Question.findAll(queryBuilder);
        return res.json(questions);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },  
  };
};
