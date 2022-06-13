const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { rmSync } = require("fs");

const hostname = "localhost";
const port = "3000";

const app = express();
// Middleware - morgan is used to generate logs
app.use(morgan("dev"));

// Middleware - bodyParser converts the body to a specified format.
// In this case JSON
app.use(bodyParser.json());

/* Rest apis */

// api endpoint for /dishes
app.all("/dishes", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  next();
});

app.get("/dishes", (req, res, next) => {
  res.end("Will send all the dishes to you!");
});

app.post("/dishes", (req, res, next) => {
  res.end(
    "Will add the dish: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});

app.put("/dishes", (req, res, next) => {
  res.statusCode = 403;
  res.end("Put operation not supported on /dishes");
});

app.delete("/dishes", (req, res, next) => {
  res.end("Deleting all the dishes!");
});

// api endpoint for /dishes/dishId

app.get("/dishes/:dishId", (req, res, next) => {
  res.end("Will send details of the dish: " + req.params.dishId + " to you!");
});

app.post("/dishes/:dishId", (req, res, next) => {
  res.statusCode = 403;
  res.end("POST operation not supported on /dishes/" + req.params.dishId);
});

app.put("/dishes/:dishId", (req, res, next) => {
  res.write("Updating the dish: " + req.params.dishId + "\t===");
  res.end(
    "Will update the dish: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});

app.delete("/dishes/:dishId", (req, res, next) => {
  res.end("Deleting dish: " + req.params.dishId);
});

// provides static files to be accessible via port/filename.extension
app.use(express.static(__dirname + "/public"));

// default execution
app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body>This is an Express Server</body></html");
});

app.listen(port, hostname, () => {
  console.log("App running at port " + port);
});
