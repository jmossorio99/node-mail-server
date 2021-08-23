/**
 * This module contains the configuration of the MariaDB database.
 */
/**
 * Module dependencies.
 */
const mariadb = require('mariadb');
const PropertiesReader = require("properties-reader");
const env = require("../environments");
const properties = new PropertiesReader(env.value)


const pool = mariadb.createPool({host: properties.get("database.db.host"), user: properties.get("database.db.user"),
    password: properties.get("database.db.password"), database: properties.get("database.db.name"), connectionLimit: 5});

module.exports = pool;
