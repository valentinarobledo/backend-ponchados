module.exports = function(sequelize, Datatypes){
	const Question = sequelize.define('Question', {
		id: {type: Datatypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
		question: {type: Datatypes.STRING, allowNull: true},
		points: {type: Datatypes.INTEGER, allowNull: true},
		time: {type: Datatypes.INTEGER, allowNull: true},
		questionnaireId: {type: Datatypes.INTEGER, allowNull: true},
		userId: {type: Datatypes.INTEGER, allowNull: true}

	},
	{
		paranoid: true,
		tableName: 'questions'

	});
	Question.associate = function(models){
		models.Question.hasMany(models.Answer);
		models.Question.belongsTo(models.Questionnaire);
	}
	return Question;
	
}