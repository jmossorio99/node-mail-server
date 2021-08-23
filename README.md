# node-mail-server

Node.js server that executes a certain task on a given interval. It uses express and mariadb, as well as toad-scheduler for the automatic running of tasks.

## Description

Every x amount of time, the server will query the database for the email logs table and will send the emails that have not yet been sent.
It will then update the corresponding rows in the database to show that the emails were now sent.
The server also has one endpoint for GET requests on '/mail-sender' which performs the same action described before.

## Installation

Use npm in the root folder of the project to install.

```bash
npm i
```

## Usage considerations

This server requires the set up of multiple environment variables in the env/development.properties file for dev testing, for example.

* db.user: the mariadb username
* db.host: server hosting the database
* db.password: password for the mariadb user
* db.name: name of the specific database that will be accessed (Note: if this value is not specified it will appear blank on the sent email,
meaning that the recipient will only see the 'from' email address and not a name)
* db.tableName: name of the email table that will be checked for unsent emails
* mail.user: the email from which the email will be sent
* mail.password: the password for the email account entered on MAIL_USER
* mail.smtpServer: the corresponding SMTP server for the sending email account
* mail.smtpPort: SMTP port for the sending email account
* mail.name: the name you wish to appear as the sender of the email
