const express = require('express');
const mongoose = require('mongoose');

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

app.use("/api", route);

// API sunucusunu dinle
app.listen(3000, () => {
  console.log('API sunucusu çalışıyor, http://localhost:3000 adresine gidin.');
});
