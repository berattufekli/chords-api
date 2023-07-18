const express = require("express");
const route = express.Router();
const mongoose = require('mongoose');
require('../models/Artist');
// Artist koleksiyonundaki verileri getir

route.get('/artists', async (req, res) => {
  try {
    const Artist = mongoose.model('Artist');
    const artists = await Artist.find();

    if (artists.length === 0) {
      res.status(404).json({
        success: true,
        message: "Sanatçı Bulunamadı",
      })
    }

    res.status(200).json({
      success: true,
      message: "Sanatçılar Getirildi",
      data: artists
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
      error: err,
    });
  }
});

module.exports = route;