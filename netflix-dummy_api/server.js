const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoose.connect('mongodb://localhost:27017/netflix', { useNewUrlParser: true }))
  .then(() => {
    console.log("DB Connected");
  });
app.listen(5000, console.log("server started"));
