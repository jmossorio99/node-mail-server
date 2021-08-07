const { ToadScheduler } = require('toad-scheduler');
const sendEmailsJob = require("./jobs");

const scheduler = new ToadScheduler();

scheduler.addSimpleIntervalJob(sendEmailsJob);

module.exports = scheduler;
