/**
 * This module contains the configuration of the MariaDB database.
 */
/**
 * Module dependencies.
 */
const mariadb = require('mariadb');

const pool = mariadb.createPool({host: process.env.DB_HOST, user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, database: process.env.DB_NAME, connectionLimit: 5});

const emailTableName = process.env.DB_EMAIL_TABLE;

/**
 * This function returns all rows in the email table of the defined database. The name of the table
 * and the name of the database are defined in the .env file.
 */
async function getEmailsTable() {
    let connection;
    try {

        connection = await pool.getConnection();
        const rows = await connection.query(`SELECT * FROM ${emailTableName}`);
        return rows;

    } catch (err) {
        throw err;
    } finally {
        if (connection) await connection.release();
    }
}

/**
 * This function receives a list of ids corresponding to rows of the email table. It then uses these
 * ids to update the corresponding rows changing the field trml_issend to 'Y'.
 */
async function updateEmailsTable(id, isAutoSend) {
    const sentInfo = isAutoSend ? "An email has been automatically sent to " : "An email has been manually sent to ";
    let connection;
    try {

        connection = await pool.getConnection();
        await connection.query(`UPDATE ${emailTableName} SET trml_issend='Y', trml_sendinfo=CONCAT('${sentInfo}', trml_mailto) WHERE trml_key=${id}`);

    } catch (err) {
        throw err;
    } finally {
        if (connection) await connection.release();
    }
}

exports.getEmailsTable = getEmailsTable;
exports.updateEmailsTable = updateEmailsTable;
