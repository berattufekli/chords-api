const multer = require("multer");
const fs = require("fs-extra");
const db = require("../models");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.params;
    const dir = `./uploads`;
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    let timeStamp = Date.now().toString();
    console.log(timeStamp);
    let fileType = file.mimetype.split("/")[1];
    let fileName = file.originalname;
    if (fileType) {
      fileName = `${timeStamp}.${fileType}`;
    }
    cb(null, fileName);
    req.fileName = fileName;
  },
});

const multerHelper = multer({ storage: storage }).single("url");

const multerHelperMultiple = multer({ storage: storage }).fields([
  {
    name: "url",
    maxCount: 1,
  },
  {
    name: "songUrl",
    maxCount: 1,
  },
]);

module.exports.save = multerHelper;
module.exports.saveWithVideo = multerHelperMultiple;