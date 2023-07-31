const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songNotesSchema = new Schema(
  {
    songId: {
      type: Schema.Types.ObjectId,
      ref: 'songs',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    note: {
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
  { collection: 'songnotes' }
);

const songnotes = mongoose.model('songnotes', songNotesSchema);

module.exports = songnotes;