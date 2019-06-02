module.exports = function(sequelize, Datatypes){
	const Answer = sequelize.define('Answer', {
		id: {type: Datatypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
		answer: {type: Datatypes.STRING, allowNull: true},
		open: {type: Datatypes.TINYINT, allowNull: true},
		questionId: {type: Datatypes.INTEGER, allowNull: true},
		correct: {type: Datatypes.TINYINT, allowNull: true}
	},
	{
		paranoid: true,
		tableName: 'answers'
	});
	Answer.associate = function(models){
		models.Answer.belongsTo(models.Question)
	}

	return Answer;
}
