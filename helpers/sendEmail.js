const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "sovilgo@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log("помилка в sendEmail.js");
    throw error;
  }
};

// const email = {
//   to: "tobalaf714@wikfee.com",
//   from: "sovilgo@gmail.com",
//   subject: "Новая заява з сайту",
//   html: "<p> З сайту надійшла нова заява</p>",
// };

module.exports = sendEmail;
