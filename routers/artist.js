const express = require("express");
const route = express.Router();

// model and controller
require("../models/artists");
const artistController = require("../controllers/artistsController");


route.post(
  "/",
  artistController.create,
);

route.get(
  "/",
  artistController.read,
);

route.put(
  "/:id",
  artistController.update
);

route.delete(
  "/:id",
  artistController.delete,
)

module.exports = route;