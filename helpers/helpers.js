require("dotenv").config();

const nodemailer = require("nodemailer");

const { EMAIL_PASS, EMAIL_USER } = process.env;

function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

async function sendMail({ to, subject, html, text }) {
  const email = {
    from: "info@mycontacts.com",
    to,
    subject,
    html,
    text,
  };

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transport.sendMail(email);
}

module.exports = {
  tryCatchWrapper,
  HttpError,
  sendMail,
};
