const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    artistName: String,
    artistDescription: String,
    // Diğer alanları buraya ekleyebilirsiniz
  },
  { collection: 'Artist' }
);

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;