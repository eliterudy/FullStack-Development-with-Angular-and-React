const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dishRouter = require("./routes/dishRouter");

const hostname = "localhost";
const port = "3000";

const app = express();
// Middleware - morgan is used to generate logs
app.use(morgan("dev"));

// Middleware - bodyParser converts the body to a specified format.
// In this case JSON
app.use(bodyParser.json());
app.use("/dishes", dishRouter);

/* Rest apis */

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
