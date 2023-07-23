const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId()
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'artists',
      required: true,
    },
    songName: {
      type: String,
      required: true,
    },
    songAlbum: {
      type: String,
      required: true,
    },
    originalTone: {
      type: String,
    },
    easyTone: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'passive'],
      default: "active",
    },
    lyrics: {
      type: [String],
    },
    createdDate: {
      type: Date,
      default: Date.now,
    }
    // Diğer alanları buraya ekleyebilirsiniz
  },
  { collection: 'songs' }
);

const songs = mongoose.model('songs', songSchema);

module.exports = songs;