const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    artistName: {
      type: String,
      required: true,
    },
    artistDescription: {
      type: String,
      required: true,
    },
    url: {
      type: String,
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
  { collection: 'artists' }
);

const artists = mongoose.model('artists', artistSchema);

module.exports = artists;