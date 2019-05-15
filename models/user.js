module.exports = function(sequelize, DataTypes){
	const User = sequelize.define('User', {
		id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
		username:{type: DataTypes.STRING(191), allowNull: true},
		password:{type: DataTypes.STRING(191), allowNull: true},
		rolId:{type: DataTypes.INTEGER, allowNull: true},
		groupId:{type: DataTypes.INTEGER, allowNull: true},
		name: {type: DataTypes.STRING(191), allowNull: true},
		email:{type: DataTypes.STRING(191), allowNull: true},
		token:{type: DataTypes.STRING(191), allowNull: true},
		number: {type: DataTypes.INTEGER, allowNull: true},
		
	},

	{
		paranoid: true,
	    tableName: 'users',
	});

	return User; 

}
