const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

// Şifrelenmiş şifre oluşturan fonksiyon
function encryptPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      audoIndex: true,
    },
    password: {
      type: String,
      required: true,
      set: encryptPassword,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpire: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'passive'],
      default: "active",
    },
    userType: {
      type: String,
      enum: ['admin', 'student'],
      default: "student",
    },
    createdDate: {
      type: Date,
      default: Date.now,
    }
    // Diğer alanları buraya ekleyebilirsiniz
  },
  { collection: 'users' }
);

const users = mongoose.model('users', userSchema);

module.exports = users;