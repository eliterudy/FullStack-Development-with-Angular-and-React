var express = require("express");
var bodyParser = require("body-parser");
const authenticate = require("../authenticate");
var multer = require("multer");
const cors = require("./cors");
const { urlencoded } = require("express");

// multer property to store assets from incoming request on Disk
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // params are
    // 1. err
    // 2. image destination folder
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

// defines the filters => type of files acceptable to store on disk
const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

var uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

/* api endpoint for /leaders */

uploadRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(
    cors.cors,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.statusCode = 403;
      res.end("GET operation not supported on /imageUpload");
    }
  )
  .post(upload.single("imageFile"), (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    console.log("here", upload.storage.getFileName);
    res.json({ filePath: urlencoded("../public/images") });
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /imageUpload");
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.statusCode = 403;
      res.end("DELETE operation not supported on /imageUpload");
    }
  );

module.exports = uploadRouter;
