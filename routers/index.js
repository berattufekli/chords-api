const express = require("express");
const route = express.Router();

const db = require("../models");

const fundamentalRoute = require("./fundamentalRouter");
const fundamentalRouterWithMulter = require("./fundamentalRouterWithMulter");

route.use("/artists", fundamentalRouterWithMulter(db.artists));
route.use("/songs", fundamentalRouterWithMulter(db.songs));
route.use("/lyrics", fundamentalRouterWithMulter(db.lyrics));
route.use("/chords", fundamentalRoute(db.chords));
route.use("/song-chords", fundamentalRoute(db.songChords));

module.exports = route;