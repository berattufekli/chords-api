const mongoose = require('mongoose');
const asyncErrorWrapper = require("express-async-handler");

exports.register = asyncErrorWrapper(async (req, res, next) => {
  try {
    const Users = mongoose.model("users");
    const newUser = new Users(req.body);
    const response = await newUser.save();

    console.log(newUser);

    console.log(response);

    res.status(200).json({
      model: "users",
      success: true,
      message: "Yeni kayıt oluşturuldu",
      data: response,
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'Sunucu hatası',
      error: err,
    });
  }
});

exports.login = asyncErrorWrapper(async (req, res, next) => {
  const { user, token } = req;

  console.log(req.body);
  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60
      ),
      secure: true,
    })
    .json({
      isAuthenticated: true,
      success: true,
      access_token: token,
      message: "Login is Succesfull",
      email: user.email,
      userType: user.userType,
      userAuth: user.userType,
      name: user.name,
      surname: user.surname,
      userId: user._id,
    });
});




