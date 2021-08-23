/**
 * This module handles the sending of the emails.
 */
/**
 * Module dependencies.
 */
const nodemailer = require("nodemailer");
const MailModel = require("../model/model_mail_sender");
const {log} = require("debug");

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
const buildEmailDetails = (emailData) => {
    return {
        from: `"${process.env.MAIL_NAME || ''}" <${process.env.MAIL_USER}>`,
        to: emailData.trml_mailto,
        subject: emailData.trml_subject,
        html: emailData.trml_body
    };
}

const MailSenderService = {

    /**
     * This async function is called by the scheduler and it checks for emails to send.
     * If an email needs to be sent, it calls the dispatch email function defined
     * above. Finally, it makes sure to call the updateEmailsTable function defined
     * on the pool_mariadb.js module to update the rows of the emails that were sent.
     */
    checkEmailsToSend: async (params) => {
        const queryResult = await MailModel.getCollection_mail();
        if (queryResult.status === "success") {
            const mails = queryResult.data;
            for (const mail of mails) {
                if (mail.trml_issend === "N") {
                    const emailDetails = buildEmailDetails(mail);
                    transporter.sendMail(emailDetails, (err, data) => {
                        if (err) {
                            console.log("Error sending mail: ", err);
                        } else {
                            console.log("Email sent successfully");
                            MailModel.update_mail({id: `"${mail.trml_key}"`, isAutoSend: params.isAutoSend});
                        }
                    })
                }
            }
        }
    }
}

module.exports = MailSenderService;
