const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chordSchema = new Schema(
  {
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'songs',
      required: true,
    },
    chordNo: {
      type: Number,
      required: true,
    },
    chordName: {
      type: String,
      required: true,
    },
    C_tone: {
      type: String,
      required: true,
    },
    C_sharp_tone: {
      type: String,
      required: true,
    },
    Db_tone: {
      type: String,
      required: true,
    },
    D_tone: {
      type: String,
      required: true,
    },
    D_sharp_tone: {
      type: String,
      required: true,
    },
    Eb_tone: {
      type: String,
      required: true,
    },
    E_tone: {
      type: String,
      required: true,
    },
    F_tone: {
      type: String,
      required: true,
    },
    F_sharp_tone: {
      type: String,
      required: true,
    },
    Gb_tone: {
      type: String,
      required: true,
    },
    G_tone: {
      type: String,
      required: true,
    },
    G_sharp_tone: {
      type: String,
      required: true,
    },
    Ab_tone: {
      type: String,
      required: true,
    },
    A_tone: {
      type: String,
      required: true,
    },
    A_sharp_tone: {
      type: String,
      required: true,
    },
    Bb_tone: {
      type: String,
      required: true,
    },
    B_tone: {
      type: String,
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
  { collection: 'chords' }
);

const chords = mongoose.model('chords', chordSchema);

module.exports = chords;