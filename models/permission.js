module.exports = function(sequelize, DataTypes){
	const Permission = sequelize.define('Permission', {
		id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
		name: {type: DataTypes.STRING(191), allowNull: false},
		rolId: {type: DataTypes.INTEGER, allowNull: false }
	},
	{
		paranoid: true,
		tableName: 'permissions'
	});

	return Permission; 

}
