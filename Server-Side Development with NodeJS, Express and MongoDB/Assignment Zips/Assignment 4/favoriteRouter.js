var express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/users");
const Dishes = require("../models/dishes");
const Favorites = require("../models/favorite");

var passport = require("passport");
var authenticate = require("../authenticate");
const cors = require("./cors");

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({ user: req.user._id })
      .populate(["user", "dishes"])
      .then(
        (favorites) => {
          if (favorites != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favorites);
          } else {
            err = new Error("Favorites not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id }, (err, favorites) => {
      if (err) {
        err = new Error("Fav not found");
        err.status = 404;
        return next(err);
      }
      if (!favorites) {
        req.body = [...req.body].filter(
          (s, index, array) => array.indexOf(s) === index
        );
        Favorites.create({
          user: req.user._id,
          dishes: [...req.body].filter(
            (s, index, array) => array.indexOf(s) === index
          ),
        })
          .then(
            (favorites) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorites);
            },
            (err) => next(err)
          )
          .catch((err) => next(err));
      } else {
        favorites.dishes = [...favorites.dishes, ...req.body].filter(
          (s, index, array) => array.indexOf(s) === index
        );
        favorites.save().then(
          (favorites) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favorites);
          },
          (err) => next(err)
        );
      }
    });
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.setHeader("Context-Type", "text/plain");
    res.end("PUT operation not supported on /favorites/");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id }, (err, favorites) => {
      if (err) {
        err = new Error("Fav not found");
        err.status = 404;
        return next(err);
      }
      if (favorites) {
        Favorites.findByIdAndRemove({ _id: favorites._id })
          .then((resp) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(resp);
          })
          .catch((err) => next(err));
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end("You dont have any favourites");
      }
    });
  });

// /* api endpoint for /dishes/dishId  */

favoriteRouter
  .route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.setHeader("Context-Type", "text/plain");
    res.end("GET operation not supported on /favorites/dishId");
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id }, (err, favorites) => {
      if (err) {
        err = new Error("Fav not found");
        err.status = 404;
        return next(err);
      }

      if (!favorites) {
        Favorites.create({
          user: req.user._id,
          dishes: [{ _id: req.params.dishId }],
        })
          .then(
            (favorites) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorites);
            },
            (err) => next(err)
          )
          .catch((err) => next(err));
      } else {
        favorites.dishes = [
          ...favorites.dishes,
          { _id: req.params.dishId },
        ].filter((s, index, array) => array.indexOf(s) === index);
        favorites.save().then(
          (favorites) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favorites);
          },
          (err) => next(err)
        );
      }
    });
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.setHeader("Context-Type", "text/plain");
    res.end("PUT operation not supported on /favorites/");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id }, (err, favorites) => {
      if (err) {
        err = new Error("Fav not found");
        err.status = 404;
        return next(err);
      }
      if (favorites) {
        favorites.dishes.splice(
          favorites.dishes.findIndex((dish) => dish._id === req.params.dishId),
          1
        );
        favorites.save().then(
          (favorites) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favorites);
          },
          (err) => next(err)
        );
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorites);
      }
    });
  });

module.exports = favoriteRouter;
