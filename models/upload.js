module.exports = function(sequelize, Datatypes){
	const Upload = sequelize.define('Upload', {
		id: {type: Datatypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
		doc: {type:Datatypes.STRING(191), allowNull: true}
	},
	{
		paranoid: true,
		tableName: 'uploads'
	});
	
	return Upload;
}
