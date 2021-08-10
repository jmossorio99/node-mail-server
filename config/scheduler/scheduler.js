/**
 *This module instantiates a scheduler from the toad-scheduler package and adds jobs from the jobs.js module
 * to the scheduler instance.
 */
/**
 * Module dependencies.
 */
const { ToadScheduler } = require('toad-scheduler');
const { sendEmailsJob } = require("./jobs");

const scheduler = new ToadScheduler();

scheduler.addSimpleIntervalJob(sendEmailsJob);

exports.scheduler = scheduler;
