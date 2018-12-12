const dbConfig = require('../config').db;
const knex = require('knex');

const db = knex({
  client: 'mysql',
  connection: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  }
});

module.exports = db;
