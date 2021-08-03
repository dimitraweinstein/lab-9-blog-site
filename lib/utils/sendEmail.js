const nodemailer = require('nodemailer');

module.exports = async ({
  from = 'no-reply@localhost',
  to,
  subject,
  html,
}) => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    const message = await transporter.sendMail({ to, from, subject, html });
    const mailPreviewURL = nodemailer.getTestMessageUrl(message);

    console.log(message);
    console.log(mailPreviewURL);

    return mailPreviewURL;
  } catch(err) {
    console.error(err);
  }
};


