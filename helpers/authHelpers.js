const expressAsyncHandler = require("express-async-handler");

exports.isAccessTokenIncluded = expressAsyncHandler(async (req) => {
  return (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer: ")
  );
});

exports.getAccessTokenFromHeader = expressAsyncHandler(async (req) => {
  return req.headers.authorization.split(" ")[1];
});