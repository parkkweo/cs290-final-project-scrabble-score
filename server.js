var fs = require("fs");
var path = require("path");
var express = require("express");
const bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 3000;
var scores = require("./scores.json");
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.status(200).sendFile(__dirname + "/public/index.html");
});

app.get("/index", function (req, res) {
  res.status(200).sendFile(__dirname + "/public/index.html");
});

app.get("/log", function (req, res) {
  res.status(200).sendFile(__dirname + "/public/log.html");
});

app.get("/logData", function (req, res) {
  res.json(scores);
});

app.get("*", function (req, res) {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

// server receives data from client
app.post("/indexData", function (req, res, next) {
  var score = req.body.score;
  if (score !== undefined) {
    scores.push({
      score: score,
    });

    fs.writeFile(
      "./scores.json",
      JSON.stringify(scores, null, 2),
      function (err) {
        if (err) res.status(500).send("Error writing data to DB");
        else res.status(200).send("Data successfully added!");
      }
    );
  } else {
    res.status(400).send("Invalid score data");
  }
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
