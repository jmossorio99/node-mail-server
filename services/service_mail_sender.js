const nodemailer = require("nodemailer");
const { convert } = require('html-to-text');
const { getEmailsTable, updateEmailsTable } = require("../config/database/dbConfig");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "joseossorio99@gmail.com",
        pass: "ym&8#HWn97Q7bsobaW4X"
    }
});

function dispatchEmail(emailDetails) {
    transporter.sendMail(emailDetails, (err, data) => {
        if (err) {
            console.log("Error sending mail: ", err);
        } else {
            console.log("Email sent successfully.");
        }
    })
}

function buildEmailDetails(emailData) {
    const emailDetails = {
        from: '"Jose Ossorio" <joseossorio99@gmail.com>',
        // to: emailData.trml_mailto,
        to: "joseossorio99@hotmail.com",
        subject: emailData.trml_subject,
        text: convert(emailData.trml_body, { preserveNewlines: true })
    }
    return emailDetails;
}

const checkEmailsToSend = async () => {
    const rows = await getEmailsTable();
    const idsToUpdate = [];
    for (const row of rows) {
        if (row.trml_issend === "N") {
            idsToUpdate.push(`"${row.trml_key}"`);
            const emailDetails = buildEmailDetails(row);
            console.log(emailDetails);
        }
    }
    if (idsToUpdate.length > 0) {
        console.log("Updating database hehehehehe")
        // await updateEmailsTable(idsToUpdate);
    }
}

exports.checkEmailsToSend = checkEmailsToSend;
