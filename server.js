const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

const app = express();

const route = require("./routers");

const dotenv = require("dotenv");
dotenv.config({
  path: "./config/config.env",
});

// MongoDB bağlantısı
mongoose.connect('mongodb+srv://berattufekli:CFr8Ms705Gqrxjw7@chords.pa91f50.mongodb.net/chords_test?retryWrites=true&w=majority&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB bağlantısı başarılı!');
}).catch((error) => {
  console.error('MongoDB bağlantısı başarısız: ', error);
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/api", route);
const PORT = process.env.PORT || 8080;
// API sunucusunu dinle
app.listen(PORT , () => {
  console.log('API sunucusu çalışıyor, http://localhost:8080 adresine gidin.');
});
