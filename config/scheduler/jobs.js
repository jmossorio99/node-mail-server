const {SimpleIntervalJob, AsyncTask} = require('toad-scheduler');
const sendEmails = require("../../services/service_mail_sender");

const sendEmailsTask = new AsyncTask(
    "sendEmailsTask",
    () => {
        return sendEmails().then((result) => {
            console.log("Logging result at " + new Date());
        });
    },
    (err) => {
        console.log(err)
    }
);

const sendEmailsJob = new SimpleIntervalJob({seconds: 20,}, sendEmailsTask);

module.exports = {sendEmailsJob};
