
const asyncErrorWrapper = require("express-async-handler");
const mongoose = require("mongoose");

exports.create = asyncErrorWrapper(async (req, res, next) => {
  try {
    const Lists = mongoose.model("lists");
    const newList = new Lists(req.body);
    const response = await newList.save();

    res.status(200).json({
      model: "lists",
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

exports.read = asyncErrorWrapper(async (req, res, next) => {
  try {
    const Lists = mongoose.model("lists");
    const response = await Lists.find({});


    if (response.length === 0) {
      res.status(200).json({
        model: "lists",
        success: true,
        message: "Kayıtlar bulunamadı Controller",
        count: response.length,
        data: response,
      });
    }


    res.status(200).json({
      model: "lists",
      success: true,
      message: "Kayıtlar getirildi Controller",
      count: response.length,
      data: response,
    });
  } catch (error) {
    return res.status(200).json({
      model: "lists",
      success: false,
      message: "Kayıtlar getirilemedi Controller",
      error,
    });
  }
});

exports.readUserList = asyncErrorWrapper(async (req, res, next) => {
  const userId = req.params.id;
  try {
    const Lists = mongoose.model("lists");
    const response = await Lists.find({ userId: userId });


    if (response.length === 0) {
      res.status(200).json({
        model: "lists",
        success: true,
        message: "Kayıtlar bulunamadı Controller",
        count: response.length,
        data: response,
      });
    }


    res.status(200).json({
      model: "lists",
      success: true,
      message: "Kayıtlar getirildi Controller",
      count: response.length,
      data: response,
    });
  } catch (error) {
    return res.status(200).json({
      model: "lists",
      success: false,
      message: "Kayıtlar getirilemedi Controller",
      error,
    });
  }
});


exports.update = asyncErrorWrapper(async (req, res, next) => {
  const listId = req.params.id;


  try {
    const Lists = mongoose.model("lists");
    const updatesList = await Lists.findByIdAndUpdate(listId, req.body, { new: true });



    if (!updatesList) {
      return res.status(404).json({
        model: "lists",
        success: false,
        message: "Güncellenecek kayıt bulunamadı",
      });
    }

    res.status(200).json({
      model: "lists",
      success: true,
      message: "Kayıt güncellendi",
      data: updatesList,
    });
  } catch (err) {
    res.status(500).json({
      model: "lists",
      success: false,
      message: 'Sunucu hatası',
      error: err,
    });
  }
});


exports.delete = asyncErrorWrapper(async (req, res, next) => {
  const listId = req.params.id;

  try {
    const Lists = mongoose.model("lists");
    const deletedSongNote = await Lists.findByIdAndDelete(listId);

    if (!deletedSongNote) {
      return res.status(404).json({
        model: "lists",
        success: false,
        message: "Silinecek kayıt bulunamadı",
      });
    }

    res.status(200).json({
      model: "lists",
      success: true,
      message: "Kayıt silindi",
      data: deletedSongNote,
    });
  } catch (err) {
    res.status(500).json({
      model: "lists",
      success: false,
      message: "Sunucu hatası",
      error: err,
    });
  }
});