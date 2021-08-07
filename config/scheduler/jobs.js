const {SimpleIntervalJob, AsyncTask} = require('toad-scheduler');
const checkEmailsToSend = require("../../services/service_mail_sender");

const sendEmailsTask = new AsyncTask(
    "sendEmailsTask",
    () => {
        return checkEmailsToSend();
    },
    (err) => {
        console.log(err)
    }
);

const sendEmailsJob = new SimpleIntervalJob({seconds: 10,}, sendEmailsTask);

module.exports = {sendEmailsJob};
