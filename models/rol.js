module.exports = function(sequelize, DataTypes){
	const Rol = sequelize.define('Rol', {
		id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
		name: {type: DataTypes.STRING(191), allowNull: false}		
	},

	{
		paranoid: true,
	    tableName: 'rols',
	});

	return Rol; 
}