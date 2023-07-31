const express = require("express");
const route = express.Router();

// model and controller
require("../models/artists");
const usersController = require("../controllers/usersController");


route.post(
  "/",
  usersController.create,
);

route.get(
  "/",
  usersController.read,
);

route.put(
  "/:id",
  usersController.update
);

route.delete(
  "/:id",
  usersController.delete,
)

module.exports = route;