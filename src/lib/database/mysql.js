const mysql = require('mysql');
const packageJson = require('../../../package.json');

const host = process.env.MYSQL_HOST || packageJson.config.database.mysql.host;
const port = process.env.MYSQL_PORT || packageJson.config.database.mysql.port;
const user = process.env.MYSQL_USER || packageJson.config.database.mysql.user;
const password = process.env.MYSQL_PASSWORD || packageJson.config.database.mysql.password;
const database = process.env.MYSQL_DATABASE || packageJson.config.database.mysql.database;

const connection = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database
})

module.exports = exports = connection;
