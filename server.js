const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const cors = require("cors");
const {cloudinary} = require('./routes/cloudinary');
const session = require("express-session");


const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
//bring in routes
const routes = require("./routes")


app.use(logger("dev"));

//define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/satsopBulbFarmdb", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

// Session Secret
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000
  }
}));


//use routes
app.use("/api", routes)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
