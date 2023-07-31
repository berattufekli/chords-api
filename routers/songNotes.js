const express = require("express");
const route = express.Router();

// model and controller
require("../models/artists");
const songNotesController = require("../controllers/songNotesController");


route.post(
  "/",
  songNotesController.create,
);

route.get(
  "/",
  songNotesController.read,
);

route.put(
  "/:id",
  songNotesController.update
);

route.delete(
  "/:id",
  songNotesController.delete,
)

module.exports = route;