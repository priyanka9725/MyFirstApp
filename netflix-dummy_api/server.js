const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/UserRoutes");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/netflix").then(() => {
  console.log("DB Connected");
});



app.use("/api/user", userRoutes);
app.listen(5000, console.log("server started"));
