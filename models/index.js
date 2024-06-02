'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const ModelBase = require('../model');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/config.js');
const db = {};

const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

const sequelize = new Sequelize(config.database, config.username, config.password, {...config.sequelizeOpts, operatorsAliases, logging: false});

// Leer todos los archivos de modelos y definir los modelos en Sequelize
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Asociar los modelos si tienen asociaciones definidas
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Añadir métodos base a cada modelo
Object.keys(db).forEach(modelName => {
  Object.keys(ModelBase).forEach(fnName => {
    db[modelName][fnName] = ModelBase[fnName];
  });
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
