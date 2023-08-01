const express = require("express");
const route = express.Router();

// model and controller
require("../models/lists");
const listsController = require("../controllers/listsController");


route.post(
  "/",
  listsController.create,
);

route.get(
  "/",
  listsController.read,
);

route.get(
  "/:id",
  listsController.readUserList,
);

route.put(
  "/:id",
  listsController.update
);

route.delete(
  "/:id",
  listsController.delete,
)

module.exports = route;