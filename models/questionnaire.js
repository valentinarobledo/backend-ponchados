module.exports = function(sequelize, Datatypes){
	const Questionnaire = sequelize.define('Questionnaire', {
		id:{type: Datatypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
		name: {type: Datatypes.STRING(191), allowNull: true},
		questionId: {type: Datatypes.INTEGER, allowNull: true},
		answerId: {type: Datatypes.INTEGER, allowNull: true},
		groupId: {type: Datatypes.INTEGER, allowNull: true},
		active: {type: Datatypes.TINYINT, allowNull: true}
	},
	{
		paranoid: true,
		tableName: 'questionnaires'
	});

	return Questionnaire;
}
