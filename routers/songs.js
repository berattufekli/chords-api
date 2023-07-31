const express = require("express");
const route = express.Router();

// model and controller
require("../models/artists");
const songsController = require("../controllers/songsController");


route.post(
  "/",
  songsController.create,
);

route.get(
  "/",
  songsController.read,
);

route.put(
  "/:id",
  songsController.update
);

route.delete(
  "/:id",
  songsController.delete,
)

module.exports = route;