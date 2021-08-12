/**
 * Module dependencies.
 */
const express = require("express");
const logger = require("morgan");

/**
 * Scheduler.
 */
require("./config/scheduler/scheduler");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Services.
 */
const { MailSenderService } = require("./services/service_mail_sender");
const mailSenderService = new MailSenderService(app);

module.exports = app;
