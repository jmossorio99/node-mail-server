/**
 * Module dependencies.
 */
const express = require("express");
const logger = require("morgan");
const env = require("./environments");
const PropertiesReader = require("properties-reader");

const app = express();

/**
 * Properties
 */
const properties = new PropertiesReader(env.value);
app.set("properties", properties);

/**
 * Scheduler.
 */
require("./config/scheduler/scheduler");

/**
 * Routes.
 */
const mailSenderRouter = require("./routes/uri/mail_sender_router");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/mail-sender", mailSenderRouter);

module.exports = app;
