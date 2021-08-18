/**
 * This module handles the sending of the emails.
 */
/**
 * Module dependencies.
 */
const nodemailer = require("nodemailer");
const {getEmailsTable, updateEmailsTable} = require("../config/database/dbConfig");

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
 * This is an auxiliary function to build emailDetails for a specific emailData object retrieved from
 * the database
 */
function buildEmailDetails(emailData) {
    const emailDetails = {
        from: `"${process.env.MAIL_NAME || ''}" <${process.env.MAIL_USER}>`,
        to: emailData.trml_mailto,
        subject: emailData.trml_subject,
        html: emailData.trml_body
    }
    return emailDetails;
}

/**
 * This async function is called by the scheduler and it checks for emails to send.
 * If an email needs to be sent, it calls the dispatch email function defined
 * above. Finally, it makes sure to call the updateEmailsTable function defined
 * on the dbConfig.js module to update the rows of the emails that were sent.
 */
const checkEmailsToSend = async (isAutoSend) => {
    const rows = await getEmailsTable();
    for (const row of rows) {
        if (row.trml_issend === "N") {
            const emailDetails = buildEmailDetails(row);
            await transporter.sendMail(emailDetails, (err, data) => {
                if (err) {
                    console.log("Error sending mail: ", err);
                } else {
                    console.log("Email sent successfully.");
                    updateEmailsTable(`"${row.trml_key}"`, isAutoSend);
                }
            })
        }
    }
}

const MailSenderService = function (app) {
    app.get("/mail-sender", (req, res) => {
        checkEmailsToSend(false)
            .then(_ => {
                res.status(200)
                res.send("Emails sent")
            })
            .catch(err => {
                res.status(500)
            })
    })
}

exports.checkEmailsToSend = checkEmailsToSend;
exports.MailSenderService = MailSenderService;
