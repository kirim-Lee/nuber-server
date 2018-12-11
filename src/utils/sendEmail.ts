import mailgun from 'mailgun-js';

const mailGunClient = new mailgun({
    apiKey: process.env.MAILGUNKEY || '', 
    domain: "sandbox2ae90952ae434775ba0c4077c896e16e.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
    const emailData: mailgun.messages.SendData = {
        from:'uthi1004@gmail.com',
        to:'uthi1004@gmail.com',
        subject,
        html
    }
    return mailGunClient.messages().send(emailData);
}

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://nuver.com/verification/${key}/"> here </a>`;
    return sendEmail(emailSubject, emailBody)
}