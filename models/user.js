// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    password: {type: DataTypes.STRING(191), allowNull: false},
    rolId: {type: DataTypes.INTEGER, allowNull: true},
    groupId: {type: DataTypes.INTEGER, allowNull: true},
    name: {type: DataTypes.STRING(191), allowNull: true},
    email: {type: DataTypes.STRING(191), allowNull: false},
    points: {type: DataTypes.STRING(191), allowNull: true},
    token: {type: DataTypes.STRING(191), allowNull: true},
    number: {type: DataTypes.STRING(191), allowNull: true},
  }, {
    paranoid: true,
    tableName: 'users',
  });

  User.associate = function(models) {
    User.belongsTo(models.Group, { foreignKey: 'groupId', as: 'group' });
  };

  return User;
};
