const CustomError = require("../../helpers/errors/CustomError");

const customErrorHandler = (err,req,res,next) => {
    if(err.name === "SequelizeUniqueConstraintError"){
        res.status(400)
        .json({
            success: false,
            message: 'Dublicate key found. Change your inputs.',
        })
    };
    if(err.name === 'SequelizeValidationError'){
        err = new CustomError(err.message,400);
    };
    res
   .status(err.status || 500)
   .json({
       success: false,
       message: err.message
   });
};
module.exports = customErrorHandler;