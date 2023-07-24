const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();

const route = require("./routers");


// MongoDB bağlantısı
mongoose.connect('mongodb+srv://berattufekli:SampiyonBesiktas1903@chords.jz3fkpd.mongodb.net/chords_test', {
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

// API sunucusunu dinle
app.listen(8080, "0.0.0.0" , () => {
  console.log('API sunucusu çalışıyor, http://localhost:8080 adresine gidin.');
});
