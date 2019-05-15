module.exports = function(sequelize, Datatypes){
	const Question = sequelize.define('Question', {
		id: {type: Datatypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
		question: {type: Datatypes.STRING, allowNull: true},
		selected: {type: Datatypes.TINYINT, allowNull: true}
	},
	{
		paranoid: true,
		tableName: 'questions'

	});

	return Question;
	
}