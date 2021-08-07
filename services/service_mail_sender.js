const nodemailer = require("nodemailer");

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

// TODO: finish this function
function buildEmailDetails(emailData) {

}

const checkEmailsToSend = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hello");
            const emailDetails = {
                from: '"Jose Ossorio" <joseossorio99@gmail.com>',
                to: "joseossorio99@hotmail.com",
                subject: "Test",
                text: "Hello, this is a test. Sent at " + new Date()
            }
            dispatchEmail(emailDetails);
        }, 100)
    });
}

module.exports = checkEmailsToSend;
