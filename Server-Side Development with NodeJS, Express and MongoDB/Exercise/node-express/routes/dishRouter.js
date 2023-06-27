const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
var udid = require("udid")("thecookbook");

/* api endpoint for /dishes */

dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    next();
  })
  .get((req, res, next) => {
    let rawdata1 = fs.readFileSync(require.resolve("../dataset1.json"), {
      encoding: "utf8",
    });
    let rawdata2 = fs.readFileSync(require.resolve("../dataset2.json"), {
      encoding: "utf8",
    });
    var data1 = JSON.parse(rawdata1).data;
    var data2 = JSON.parse(rawdata2).data;
    console.log(data1[0].url);
    var results = [];
    for (var i = 0; i < data1.length; i++) {
      var matchedResult = data2.filter((d) => d.URL === data1[i].url);
      if (matchedResult.length > 0) {
        var result = {
          ...data1[i],
          ingredients: data1[i].ingredients.split(","),
          instructions: data1[i].instructions
            .replaceAll(".", ".\n")
            .split("\n"),
          prepTimeInMins: matchedResult[0].PrepTimeInMins,
          cookTimeInMins: matchedResult[0].CookTimeInMins,
          servings: matchedResult[0].Servings,
          course: matchedResult[0].Course,
          diet: matchedResult[0].Diet,
        };
        delete result["url"];
        console.log(result, "\n\n");
        results.push(result);
      }
    }
    // fs.readFile("../dataset1.json", (err, data) => {
    //   if (err) throw err;
    //   let data1 = JSON.parse(data);
    //   console.log(data1);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(results);
    // });
  })
  .post((req, res, next) => {
    res.end(
      "Will add the dish: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("Put operation not supported on /dishes");
  })
  .delete((req, res, next) => {
    res.end("Deleting all the dishes!");
  });

/* api endpoint for /dishes/dishId  */

dishRouter
  .route("/:dishId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send details of the dish: " + req.params.dishId + " to you!");
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
  })
  .put((req, res, next) => {
    res.write("Updating the dish: " + req.params.dishId + "\t===");
    res.end(
      "Will update the dish: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .delete((req, res, next) => {
    res.end("Deleting dish: " + req.params.dishId);
  });

module.exports = dishRouter;
