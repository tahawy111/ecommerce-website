const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
env.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes")(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DATABASE CONNECTED"));

app.listen(process.env.PORT, () =>
  console.log(`App is Listening at http://localhost:${process.env.PORT}`)
);
