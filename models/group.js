module.exports = function(sequelize, DataTypes){
	const Group = sequelize.define('Group', {
		id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
		name: {type: DataTypes.STRING(191), allowNull: true},
		points: {type: DataTypes.STRING(191), allowNull: true}		
	},

	{
		paranoid: true,
	    tableName: 'groups',
	});

	return Group; 
}