const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const contactsRouter = require("./routes/api/contacts");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const contactsRouter = require("./routes/api/contacts");
const userRouter = require("./routes/api/user");
// const sgMail = require("@sendgrid/mail");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);
// app.use("/api/");

const { DB_HOST, SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("---> db was connected");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json(message);
});

// const email = {
//   to: "tobalaf714@wikfee.com",
//   from: "sovilgo@gmail.com",
//   subject: "Новая заява з сайту",
//   html: "<p> З сайту надійшла нова заява</p>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email sent successful "))
//   .catch((error) => console.log(error.message));

module.exports = app;
