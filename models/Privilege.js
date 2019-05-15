module.exports = function(sequelize, DataTypes){	
	const Privilege = sequelize.define('Privilege', {
		id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
		name: {type: DataTypes.STRING(191), allowNull: false},
		rolIdId: {type: DataTypes.INTEGER, allowNull: false },
		permissionsId:{type: DataTypes.INTEGER, allowNull: false}
	},
	{
		paranoid: true,
		tableName: 'privileges'
	});

	return Privilege; 
}