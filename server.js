const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

//bring in models
const db = require("./models")

const app = express();
//bring in routes
const routes = require("./routes")


app.use(logger("dev"));

//define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/satsopBulbFarmdb", { useNewUrlParser: true });

//use routes
app.use("/api", routes.Home)
app.use("/api", routes.PlantingInstructions)
app.use("/api", routes.Product)
app.use("/api", routes.User)



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
