const express = require("express");
const http = require("http");

const hostname = "localhost";
const port = "3000";

const app = express();

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body>This is an Express Server</body></html");
});

app.listen(port, hostname, () => {
  console.log("App running at port " + port);
});
