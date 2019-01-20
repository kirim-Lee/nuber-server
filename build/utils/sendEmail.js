"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mailgun_js_1 = __importDefault(require("mailgun-js"));
var mailGunClient = new mailgun_js_1.default({
    apiKey: process.env.MAILGUNKEY || '',
    domain: "sandbox2ae90952ae434775ba0c4077c896e16e.mailgun.org"
});
var sendEmail = function (subject, html) {
    var emailData = {
        from: 'uthi1004@gmail.com',
        to: 'uthi1004@gmail.com',
        subject: subject,
        html: html
    };
    return mailGunClient.messages().send(emailData);
};
exports.sendVerificationEmail = function (fullName, key) {
    var emailSubject = "Hello! " + fullName + ", please verify your email";
    var emailBody = "Verify your email by clicking <a href=\"http://nuver.com/verification/" + key + "/\"> here </a>";
    return sendEmail(emailSubject, emailBody);
};
//# sourceMappingURL=sendEmail.js.map