const express = require("express");
const env = require("dotenv");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
env.config();

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));

require("./routes")(app);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"));

app.listen(process.env.PORT, () =>
  console.log(`App is Listening at http://localhost:${process.env.PORT}`)
);
