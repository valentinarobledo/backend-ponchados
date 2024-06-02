const config = require("./config.json");

/* const environments = {
  development: {
    username: config.development.username,
    password: config.development.password,
    database: config.development.database,
    host: config.development.sequelizeOpts.host,
    dialect: config.development.sequelizeOpts.dialect,
    logging: config.development.sequelizeOpts.logging,
  },
  production: {
    username: config.production.username,
    password: config.production.password,
    database: config.production.database,
    host: config.production.sequelizeOpts.host,
    dialect: config.production.sequelizeOpts.dialect,
    logging: config.production.sequelizeOpts.logging,
  },
};

module.exports = environments; */

module.exports = config[config.ENV];
