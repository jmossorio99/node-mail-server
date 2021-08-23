/**
 * This module handles the sending of the emails.
 */
/**
 * Module dependencies.
 */
const PropertiesReader = require("properties-reader");
const env = require("../environments");
const properties = new PropertiesReader(env.value)
const nodemailer = require("nodemailer");
const MailModel = require("../model/model_mail_sender");

const transporter = nodemailer.createTransport({
    pool: true,
    host: properties.get("email.mail.smtpServer"),
    port: properties.get("email.mail.smtpPort"),
    auth: {
        user: properties.get("email.mail.user"),
        pass: properties.get("email.mail.password")
    }
});

/**
 * This is an auxiliary function to build emailDetails for a specific emailData object retrieved from
 * the database
 */
const buildEmailDetails = (emailData) => {
    return {
        from: `"${properties.get("email.mail.name") || ''}" <${properties.get("email.mail.user")}>`,
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
