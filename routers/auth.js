const express = require("express");
const route = express.Router();

// controller
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

route.post(
  "/register",
  authController.register,
);

route.post(
  "/login",
  authMiddleware.CheckUser,
  authMiddleware.generateJwt,
  authController.login,
);

route.post(
  "/load-user",
  authMiddleware.getAccessToRoute,
  authController.login,
);

module.exports = route;