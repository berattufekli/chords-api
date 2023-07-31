const express = require("express");
const route = express.Router();

// model and controller
require("../models/artists");
const songChordsController = require("../controllers/songChordsController");


route.post(
  "/",
  songChordsController.create,
);

route.get(
  "/",
  songChordsController.read,
);

route.put(
  "/:id",
  songChordsController.update
);

route.delete(
  "/:id",
  songChordsController.delete,
)

module.exports = route;