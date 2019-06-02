module.exports = function(sequelize, Datatypes){
	const Questionnaire = sequelize.define('Questionnaire', {
		id:{type: Datatypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
		name: {type: Datatypes.STRING(191), allowNull: true},
		groupId: {type: Datatypes.INTEGER, allowNull: true},
		active: {type: Datatypes.TINYINT, allowNull: true}
	},
	{
		paranoid: true,
		tableName: 'questionnaires'
	});
		Questionnaire.associate = function(models)
		{
		models.Questionnaire.hasMany(models.Question)
		}
	return Questionnaire;
}
