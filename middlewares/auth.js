const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const authHelpers = require("../helpers/authHelpers");

function encryptPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

exports.CheckUser = expressAsyncHandler(async (req, res, next) => {
  console.log("CheckUser");
  const { email, password } = req.body;
  const Users = mongoose.model("users");

  const user = await Users.findOne({ email });

  const hashedPassword = encryptPassword(password);
  if (!user) {
    return next("Please check your credenials!", 404);
  }
  if (user.password !== hashedPassword) {
    return next("Please check your password!");
  }

  req.user = user;

  return next();
});


exports.generateJwt = expressAsyncHandler(async (req, res, next) => {
  const user = req.user;
  const { JWT_SECRET, JWT_EXPIRE } = process.env;

  
  let payload = {
    email: user.email,
    password: user.password,
    userType: user.userType,
    name: user.name,
    surname: user.surname,
    userId: user._id.toString(),
  }

  console.log("PAY", payload.userId);

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });

  req.token = token;
  console.log(token);
  return next();
});


exports.getAccessToRoute = expressAsyncHandler(async (req, res, next) => {
  try {
    console.log("ksjdkjsksjd");
    if (!(await authHelpers.isAccessTokenIncluded(req))) {
      return res.json({userAuth: "student"})
    }

    const accessToken = await authHelpers.getAccessTokenFromHeader(req);
    const { JWT_SECRET } = process.env;
    jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
      if (err) {
        return next("You are not authorized to access this route!", 401);
      }
      req.user = {
        email: decoded.email,
        name: decoded.name,
        surname: decoded.surname,
        userType: decoded.userType,
        userAuth: decoded.userType,
        _id: decoded.userId,
      };

      console.log("req.user", req.user);
      req.accessToken = accessToken;
      return next();
    });
  } catch (error) {
    console.log("error", error);
  }
});