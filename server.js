const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

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

//use routes
app.use("/api", routes)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
