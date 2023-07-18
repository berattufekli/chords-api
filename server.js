const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());

const db = require("./models");

const route = require("./routers");
const { createProxyMiddleware } = require("http-proxy-middleware");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");

const dotenv = require("dotenv");
const PORT = process.env.PORT || 8080;
const multer = require("multer");
const path = require("path");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
dotenv.config({
  path: "./config/config.env",
});

app.use("/api", route);

app.use(customErrorHandler);

app.use(
  "/*",
  createProxyMiddleware({
    target: "http://localhost:3000/", //original url
    // target: "http://68.183.110.77/", //original url
    changeOrigin: true,
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

app.get("/", (req,res)=> {
  res.send("Hello there! Api is working")
})


app.listen(PORT, async () => {
  console.log("Çalışıyor", process.env.PORT)
  // db.sequelize.sync({ force: true })
  // db.sequelize.sync() 
});