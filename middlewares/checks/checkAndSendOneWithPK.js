const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../../helpers/errors/CustomError");
const db = require("../../models");

const checkAndSendOneWithPK = (model, options) => {
  return asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const data = await model.findByPk(id, options);

    if (!data) {
      return next();
    }

    req.data = data;
    return next();
  });
};

module.exports = checkAndSendOneWithPK;
