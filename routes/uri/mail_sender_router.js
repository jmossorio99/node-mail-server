const express = require("express");
const router = express.Router();

const MailSenderService = require("../../services/service_mail_sender");

router.route("/")
    .get((req, res) => {
        MailSenderService.checkEmailsToSend({isAutoSend: false})
            .then(_ => res.send("Sending emails"));
    });

module.exports = router;
