var express = require('express');
var logger = require('morgan');
const { ToadScheduler } = require('toad-scheduler');
const { sendEmailsJob } = require("./config/scheduler/jobs");

const scheduler = new ToadScheduler();
scheduler.addSimpleIntervalJob(sendEmailsJob);

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

module.exports = app;
