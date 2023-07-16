const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../../helpers/errors/CustomError");
const db = require("../../models");
const checkAndFindAll = (model, options) => {
    return asyncErrorWrapper(async (req, res, next) => {
        const data = await model.findAll({
            where: req.params,
            ...options,
        });

        if (data.length === 0) {
            return next(new CustomError("No data found.", 404));
        }
        req.data = data;
        return next();
    });
};
module.exports = checkAndFindAll;