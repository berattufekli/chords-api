const mongoose = require('mongoose');
const asyncErrorWrapper = require("express-async-handler");

exports.create = asyncErrorWrapper(async (req, res, next) => {
  try {
    const Songs = mongoose.model("songs");
    const newSong = new Songs(req.body);
    const response = await newSong.save();

    res.status(200).json({
      model: "songs",
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
    const Songs = mongoose.model("songs");
    
    const response = await Songs.aggregate([
      {
        $lookup: {
          from: "artists",
          localField: "artistId",
          foreignField: "_id",
          as: "artistInfo"
        }
      },
      {
        $lookup: {
          from: "chords",
          localField: "_id",
          foreignField: "songId",
          as: "chordsInfo"
        }
      },
      {
        $lookup: {
          from: "songchords",
          localField: "_id",
          foreignField: "songId",
          as: "chordsData"
        }
      },
      {
        $lookup: {
          from: "songnotes",
          localField: "_id",
          foreignField: "songId",
          as: "songNote"
        }
      }
    ]);

    if (response.length === 0) {
      res.status(200).json({
        model: "songs",
        success: true,
        message: "Kayıtlar bulunamadı Controller",
        count: response.length,
        data: response,
      });
    }


    res.status(200).json({
      model: "songs",
      success: true,
      message: "Kayıtlar getirildi Controller",
      count: response.length,
      data: response,
    });
  } catch (error) {
    return res.status(200).json({
      model: "songs",
      success: false,
      message: "Kayıtlar getirilemedi Controller",
      error,
    });
  }
});


exports.update = asyncErrorWrapper(async (req, res, next) => {
  



  try {
    const songId = req.params.id;
    const Songs = mongoose.model("songs");
    const response = await Songs.findByIdAndUpdate(songId, req.body, { new: true });



    if (!response) {
      return res.status(404).json({
        model: "songs",
        success: false,
        message: "Güncellenecek kayıt bulunamadı",
      });
    }

    res.status(200).json({
      model: "songs",
      success: true,
      message: "Kayıt güncellendi",
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      model: "songs",
      success: false,
      message: 'Sunucu hatası',
      error: err,
    });
  }
});


exports.delete = asyncErrorWrapper(async (req, res, next) => {

});