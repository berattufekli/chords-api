const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../../helpers/errors/CustomError");
const db = require("../../models");

const checkAndFindOneWithPKs = (model, options) => {
    return asyncErrorWrapper(async (req, res, next) => {

        const data = await model.findOne({
            where: req.params,
            ...options,
        });

        if (!data) {
            return next(new CustomError("No data found with this ID", 404));
        }

        req.data = data;
        return next();
    });

};

module.exports = checkAndFindOneWithPKs;