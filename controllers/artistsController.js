
const asyncErrorWrapper = require("express-async-handler");
const mongoose = require("mongoose");

exports.create = asyncErrorWrapper(async (req, res, next) => {
  try {
    const Artists = mongoose.model("artists");
    const newArtist = new Artists(req.body);
    const response = await newArtist.save();

    res.status(200).json({
      model: "artists",
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
    const Artist = mongoose.model("artists");
    const response = await Artist.aggregate([
      {
        $lookup: {
          from: "songs",
          localField: "_id",
          foreignField: "artistId",
          as: "songs"
        }
      }
    ]);


    if (response.length === 0) {
      res.status(200).json({
        model: "artists",
        success: true,
        message: "Kayıtlar bulunamadı Controller",
        count: response.length,
        data: response,
      });
    }


    res.status(200).json({
      model: "artists",
      success: true,
      message: "Kayıtlar getirildi Controller",
      count: response.length,
      data: response,
    });
  } catch (error) {
    return res.status(200).json({
      model: "artists",
      success: false,
      message: "Kayıtlar getirilemedi Controller",
      error,
    });
  }
});


exports.update = asyncErrorWrapper(async (req, res, next) => {
  const artistId = req.params.id;



  try {
    const Artist = mongoose.model("artists");
    const updatedArtist = await Artist.findByIdAndUpdate(artistId, req.body, { new: true });



    if (!updatedArtist) {
      return res.status(404).json({
        model: "artists",
        success: false,
        message: "Güncellenecek kayıt bulunamadı",
      });
    }

    res.status(200).json({
      model: "artists",
      success: true,
      message: "Kayıt güncellendi",
      data: updatedArtist,
    });
  } catch (err) {
    res.status(500).json({
      model: "artists",
      success: false,
      message: 'Sunucu hatası',
      error: err,
    });
  }
});


exports.delete = asyncErrorWrapper(async (req, res, next) => {

});