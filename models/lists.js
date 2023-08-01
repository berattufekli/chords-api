const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listsSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    listName:{
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['public', 'private'],
      default: "private",
    },
    createdDate: {
      type: Date,
      default: Date.now,
    }
  },
  { collection: 'lists' }
);

const lists = mongoose.model('lists', listsSchema);

module.exports = lists;