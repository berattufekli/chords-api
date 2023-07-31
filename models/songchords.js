const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songChordSchema = new Schema(
  {
    songId: {
      type: Schema.Types.ObjectId,
      ref: 'songs',
      required: true,
    },
    chordId: {
      type: Schema.Types.ObjectId,
      ref: "chords",
      required: true,
    },
    chordName: {
      type: String,
      required: true,
    },
    line: {
      type: Number,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },  
    status: {
      type: String,
      enum: ['active', 'passive'],
      default: "active",
    },
    createdDate: {
      type: Date,
      default: Date.now,
    }
    // Diğer alanları buraya ekleyebilirsiniz
  },
  { collection: 'songchords' }
);

const songchords = mongoose.model('songchords', songChordSchema);

module.exports = songchords;