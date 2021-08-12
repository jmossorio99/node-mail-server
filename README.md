# node-mail-server

Node.js server that executes a certain task on a given interval. It uses express and mariadb, as well as toad-scheduler for the automatic running of tasks.

## Description

Every x amount of time, the server will query the database for the email logs table and will send the emails that have not yet been sent.
It will then update the corresponding rows in the database to show that the emails were now sent.
The server also has one endpoint for GET requests on '/mail-sender' which performs the same action described before.

## Installation

Use either yarn or npm in the root folder of the project to install.

```bash
yarn install
```

```bash
npm i
```

## Usage considerations

This server requires the set up of multiple environment variables:

* DB_USER: the mariadb username
* DB_HOST: server hosting the database
* DB_PASSWORD: password for the mariadb user
* DB_NAME: name of the specific database that will be accessed (Note: if this value is not specified it will appear blank on the sent email,
meaning that the recipient will only see the 'from' email address and not a name)
* DB_EMAIL_TABLE: name of the email table that will be checked for unsent emails
* MAIL_USER: the email from which the email will be sent
* MAIL_PASSWORD: the password for the email account entered on MAIL_USER
* MAIL_SMTP_SERVER: the corresponding SMTP server for the sending email account
* MAIL_SMTP_PORT: SMTP port for the sending email account
* SCHEDULER_INTERVAL_SECONDS: the interval duration for the execution of the task; e.g.: if this field has a value of 10, the task will be run every 10 seconds
