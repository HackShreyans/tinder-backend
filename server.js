const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Cards = require("./dbCards");

//App Config
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5001;

// MIddleware
app.use(express.json());
app.use(cors());

//DB Config

mongoose.connect(process.env.dbConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});

//API Endpoint
app.get("/", (req, res) => res.status(200).send("hello world ...."));
app.post("/tinder/card", (req, res) => {
  const dbCards = req.body;

  Cards.create(dbCards, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
