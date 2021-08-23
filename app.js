/**
 * Module dependencies.
 */
const express = require("express");
const logger = require("morgan");

/**
 * Scheduler.
 */
require("./config/scheduler/scheduler");

/**
 * Routes.
 */
const mailSenderRouter = require("./routes/uri/mail_sender_router");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/mail-sender", mailSenderRouter);

module.exports = app;
