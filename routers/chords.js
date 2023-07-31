const express = require("express");
const route = express.Router();

// model and controller
require("../models/chords");
const chordsController = require("../controllers/chordsController");


route.post(
  "/",
  chordsController.create,
);

route.get(
  "/",
  chordsController.read,
);

route.put(
  "/:id",
  chordsController.update
);

route.delete(
  "/:id",
  chordsController.delete,
)

module.exports = route;