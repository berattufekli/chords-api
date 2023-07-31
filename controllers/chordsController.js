const mongoose = require('mongoose');
const asyncErrorWrapper = require("express-async-handler");

exports.create = asyncErrorWrapper(async (req, res, next) => {
  try {
    const Chords = mongoose.model("chords");
    const newChords = new Chords(req.body);
    const response = await newChords.save();

    res.status(200).json({
      model: "chords",
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
    const Chords = mongoose.model("chords");
    
    const response = await Chords.find({});

    if (response.length === 0) {
      res.status(200).json({
        model: "chords",
        success: true,
        message: "Kayıtlar bulunamadı Controller",
        count: response.length,
        data: response,
      });
    }


    res.status(200).json({
      model: "chords",
      success: true,
      message: "Kayıtlar getirildi Controller",
      count: response.length,
      data: response,
    });
  } catch (error) {
    return res.status(200).json({
      model: "chords",
      success: false,
      message: "Kayıtlar getirilemedi Controller",
      error,
    });
  }
});


exports.update = asyncErrorWrapper(async (req, res, next) => {
  



  try {
    const chordsId = req.params.id;
    const Chords = mongoose.model("chords");
    const response = await Chords.findByIdAndUpdate(chordsId, req.body, { new: true });



    if (!response) {
      return res.status(404).json({
        model: "chords",
        success: false,
        message: "Güncellenecek kayıt bulunamadı",
      });
    }

    res.status(200).json({
      model: "chords",
      success: true,
      message: "Kayıt güncellendi",
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      model: "chords",
      success: false,
      message: 'Sunucu hatası',
      error: err,
    });
  }
});


exports.delete = asyncErrorWrapper(async (req, res, next) => {

});