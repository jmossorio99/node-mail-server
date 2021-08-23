const pool = require("../db/pool_mariadb");
const emailTableName = process.env.DB_EMAIL_TABLE;

const MailsModel = {

    /**
     * This function returns all rows in the email table of the defined database. The name of the table
     * and the name of the database are defined in the .env file.
     */
    getCollection_mail: async () => {
        let connection;
        try {

            connection = await pool.getConnection();
            const rows = await connection.query(`SELECT * FROM ${emailTableName}`);
            return { status: "success", data: rows };

        } catch (err) {
            return { status: "error", error: err };
        } finally {
            if (connection) await connection.release();
        }
    },
    /**
     * This function receives a list of ids corresponding to rows of the email table. It then uses these
     * ids to update the corresponding rows changing the field trml_issend to 'Y' and trml_sendinfo
     * to the corresponding information.
     */
    update_mail: async (params) => {
        const sentInfo = params.isAutoSend ? "An email has been automatically sent to " :
            "An email has been manually sent to ";
        let connection;
        try {

            connection = await pool.getConnection();
            const result = await connection.query(`UPDATE ${emailTableName} SET trml_issend='Y', trml_sendinfo=CONCAT('${sentInfo}', trml_mailto) WHERE trml_key=${params.id}`);
            console.log("Row updated");
            return { status: "success", data: result.affectedRows };

        } catch (err) {
            console.log("Error updating row");
            return { status: "error", error: err };
        } finally {
            if (connection) await connection.release();
        }
    }
};

module.exports = MailsModel;