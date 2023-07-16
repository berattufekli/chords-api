const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../../helpers/errors/CustomError");
const db = require("../../models");

const checkAndFindOneWithOnePK = (model, options) => {
    return asyncErrorWrapper(async (req, res, next) => {

        const { id } = req.params;
        const data = await model.findByPk(id, options);

        if (!data) {
            return next(new CustomError("No data found with this ID", 404));
        }

        req.data = data;
        return next();
    });

};

module.exports = checkAndFindOneWithOnePK;