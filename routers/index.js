const express = require("express");
const route = express.Router();
const mongoose = require('mongoose');

require('../models/artists');
require('../models/songs');

route.get('/:model', async (req, res) => {
  const modelName = req.params.model;

  try {

    const Model = mongoose.model(modelName);
    // const documents = await Model.find();

    switch (modelName) {
      case "artists":
        const artistsWithSongs = await Model.aggregate([
          {
            $lookup: {
              from: "songs",            
              localField: "_id",        
              foreignField: "artistId", 
              as: "songs"               
            }
          }
        ]);

        if (artistsWithSongs.length === 0) {
          return res.status(200).json({
            model: modelName,
            success: true,
            message: "Kayıtlar bulunamadı OTO",
            count: artistsWithSongs.length,
            data: documents,
          });
        }


        res.status(200).json({
          model: "artist",
          success: true,
          message: "Kayıtlar getirildi OTO",
          count: artistsWithSongs.length,
          data: artistsWithSongs,
        });
        break;
      case "songs":
        const songsWithArtist = await Model.aggregate([
          {
            $lookup: {
              from: "artists",            
              localField: "artistId",        
              foreignField: "_id", 
              as: "artistInfo"               
            }
          }
        ]);

        if (songsWithArtist.length === 0) {
          return res.status(200).json({
            model: modelName,
            success: true,
            message: "Kayıtlar bulunamadı OTO",
            count: songsWithArtist.length,
            data: songsWithArtist,
          });
        }


        res.status(200).json({
          model: "songs",
          success: true,
          message: "Kayıtlar getirildi OTO",
          count: songsWithArtist.length,
          data: songsWithArtist,
        });
        break;
      default:
        break;
    }




  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası',
      error: err,
    });
  }
});

route.post('/:model', async (req, res) => {
  const modelName = req.params.model;

  try {
    const Model = mongoose.model(modelName);
    const newDocument = new Model(req.body);
    const createdDocument = await newDocument.save();

    console.log(req);

    res.status(200).json({
      model: modelName,
      success: true,
      message: "Yeni kayıt oluşturuldu",
      data: createdDocument,
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

route.put('/:model/:id', async (req, res) => {
  const modelName = req.params.model;
  const documentId = req.params.id;

  console.log(modelName, documentId);

  try {
    console.log(req.body);
    const Model = mongoose.model(modelName);
    const updatedDocument = await Model.findByIdAndUpdate(documentId, req.body, { new: true });

    console.log(updatedDocument);

    if (!updatedDocument) {
      return res.status(404).json({
        model: modelName,
        success: false,
        message: "Güncellenecek kayıt bulunamadı",
      });
    }

    res.status(200).json({
      model: modelName,
      success: true,
      message: "Kayıt güncellendi",
      data: updatedDocument,
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