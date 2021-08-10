/**
 * This module handles the sending of the emails.
 */
/**
 * Module dependencies.
 */
const nodemailer = require("nodemailer");
const { convert } = require('html-to-text');
const { getEmailsTable, updateEmailsTable } = require("../config/database/dbConfig");

const transporter = nodemailer.createTransport({
    pool: true,
    host: process.env.MAIL_SMTP_SERVER,
    port: process.env.MAIL_SMTP_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

/**
 * This function receives the emailDetails required by the nodemailer library
 * and then sends an email according to said details.
 */
function dispatchEmail(emailDetails) {
    transporter.sendMail(emailDetails, (err, data) => {
        if (err) {
            console.log("Error sending mail: ", err);
        } else {
            console.log("Email sent successfully.");
        }
    })
}

/**
 * This is an auxiliary function to build emailDetails for a specific emailData object retrieved from
 * the database
 */
function buildEmailDetails(emailData) {
    const emailDetails = {
        from: `"${process.env.MAIL_NAME || ''}" <${process.env.MAIL_USER}>`,
        // to: emailData.trml_mailto,
        to: "joseossorio99@hotmail.com",
        subject: emailData.trml_subject,
        text: convert(emailData.trml_body, { preserveNewlines: true })
    }
    return emailDetails;
}

/**
 * This async function is called by the scheduler and it checks for emails to send.
 * If an email needs to be sent, it calls the dispatch email function defined
 * above. Finally, it makes sure to call the updateEmailsTable function defined
 * on the dbConfig.js module to update the rows of the emails that were sent.
 */
const checkEmailsToSend = async () => {
    const rows = await getEmailsTable();
    const idsToUpdate = [];
    for (const row of rows) {
        if (row.trml_issend === "N") {
            idsToUpdate.push(`"${row.trml_key}"`);
            const emailDetails = buildEmailDetails(row);
            dispatchEmail(emailDetails);
        }
    }
    if (idsToUpdate.length > 0) {
        await updateEmailsTable(idsToUpdate);
    }
}

exports.checkEmailsToSend = checkEmailsToSend;
