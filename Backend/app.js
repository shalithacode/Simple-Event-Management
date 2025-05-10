const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode | 500;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({ message, data });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.erpgzd4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then((result) => {
    // console.log(result);
    app.listen(8080);
  })
  .catch((err) => console.log(err));
