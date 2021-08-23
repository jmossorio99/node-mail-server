/**
 * This module is for creating the jobs that will be added to the scheduler. The jobs are then used in the
 * scheduler.js module to instantiate the scheduler for the server.
 */
/**
 * Module dependencies.
 */
const { SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const MailSenderService = require("../../services/service_mail_sender");

/**
 * This async task calls the checkEmailsToSend function in the service_mail_sender.js module. This task
 * is run automatically by the scheduler.
 */
const sendEmailsTask = new AsyncTask(
    "sendEmailsTask",
    () => {
        return MailSenderService.checkEmailsToSend({isAutoSend: true});
    },
    (err) => {
        console.log(err)
    }
);

/**
 * This SimpleIntervalJob defines the interval for the automatic execution of the sendEmailsTask by
 * the scheduler.
 */
const interval = parseInt(process.env.SCHEDULER_INTERVAL_SECONDS);
const sendEmailsJob = new SimpleIntervalJob({seconds: interval,}, sendEmailsTask);

exports.sendEmailsJob = sendEmailsJob;
