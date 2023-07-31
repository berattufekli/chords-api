
const asyncErrorWrapper = require("express-async-handler");
const mongoose = require("mongoose");

exports.create = asyncErrorWrapper(async (req, res, next) => {
  try {
    console.log("buraya girdik", req.body)
    const SongNotes = mongoose.model("songnotes");

    console.log(SongNotes);
    const newSongNote = new SongNotes(req.body);
    console.log(newSongNote)
    const response = await newSongNote.save();
    
    console.log(response);

    res.status(200).json({
      model: "songnotes",
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
    const SongNotes = mongoose.model("songnotes");
    const response = await SongNotes.find({});


    if (response.length === 0) {
      res.status(200).json({
        model: "songnotes",
        success: true,
        message: "Kayıtlar bulunamadı Controller",
        count: response.length,
        data: response,
      });
    }


    res.status(200).json({
      model: "songnotes",
      success: true,
      message: "Kayıtlar getirildi Controller",
      count: response.length,
      data: response,
    });
  } catch (error) {
    return res.status(200).json({
      model: "songnotes",
      success: false,
      message: "Kayıtlar getirilemedi Controller",
      error,
    });
  }
});


exports.update = asyncErrorWrapper(async (req, res, next) => {
  const songNoteId = req.params.id;



  try {
    const SongNotes = mongoose.model("songnotes");
    const updatedSongNote = await SongNotes.findByIdAndUpdate(songNoteId, req.body, { new: true });



    if (!updatedSongNote) {
      return res.status(404).json({
        model: "songnotes",
        success: false,
        message: "Güncellenecek kayıt bulunamadı",
      });
    }

    res.status(200).json({
      model: "songnotes",
      success: true,
      message: "Kayıt güncellendi",
      data: updatedSongNote,
    });
  } catch (err) {
    res.status(500).json({
      model: "songnotes",
      success: false,
      message: 'Sunucu hatası',
      error: err,
    });
  }
});


exports.delete = asyncErrorWrapper(async (req, res, next) => {
  const songNoteId = req.params.id;

  try {
    const SongNotes = mongoose.model("songnotes");
    const deletedSongNote = await SongNotes.findByIdAndDelete(songNoteId);

    if (!deletedSongNote) {
      return res.status(404).json({
        model: "songnotes",
        success: false,
        message: "Silinecek kayıt bulunamadı",
      });
    }

    res.status(200).json({
      model: "songnotes",
      success: true,
      message: "Kayıt silindi",
      data: deletedSongNote,
    });
  } catch (err) {
    res.status(500).json({
      model: "songnotes",
      success: false,
      message: "Sunucu hatası",
      error: err,
    });
  }
});