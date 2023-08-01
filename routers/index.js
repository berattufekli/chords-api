const express = require("express");
const route = express.Router();

require('../models/artists');
require('../models/songs');
require("../models/chords");
require("../models/songchords");
require("../models/users");
require("../models/songnotes");

const artistsRoute = require("./artist");
const chordsRoute = require("./chords");
const songChordsRoute = require("./songChords");
const songsRoute = require("./songs");
const usersRoute = require("./users");
const authRoute = require("./auth");
const songNotesRoute = require("./songNotes");
const listsRoute = require("./lists");

route.use("/auth", authRoute);
route.use("/users", usersRoute);
route.use("/artists", artistsRoute);
route.use("/chords", chordsRoute);
route.use("/song-chords", songChordsRoute);
route.use("/songs", songsRoute);
route.use("/song-notes", songNotesRoute);
route.use("/lists", listsRoute);

module.exports = route;