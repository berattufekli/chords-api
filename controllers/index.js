const asyncErrorWrapper = require("express-async-handler");

const db = require("../models");
const fs = require("fs-extra");
class Controller {
  constructor(model) {
    this.model = model;
  }

  getAll = asyncErrorWrapper(async (req, res) => {
    try {
      switch (this.model) {
        case db.artists:
          let songdata = await this.model.findAll({
            include: [
              {
                model: db.songs,
                as: "songsData",
              },
            ],
          });
          return res.status(200).json({
            success: true,
            data: songdata,
          });
          break;
        case db.songs:
          let data = await this.model.findAll({
            include: [
              {
                model: db.artists,
                as: "artistInfo",
              },
              {
                model: db.lyrics,
                as: "lyricsData",
              },
              {
                model: db.chords,
                as: "chordInfo",
              },
              {
                model: db.songChords,
                as: "chordsData",
              }
            ],
          });
          return res.status(200).json({
            success: true,
            data: data,
          });
          break;
        case db.lyrics:
          let lyricsdata = await this.model.findAll({
            include: [
              {
                model: db.songs,
                as: "songInfo",
              },
            ],
          });
          return res.status(200).json({
            success: true,
            data: lyricsdata,
          });
          break;
      }

      let data = await this.model.findAll();

      if (data.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No data found.",
        });
      }
      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(200).json({
        success: false,
        data: [],
      });
    }
  });

  create = asyncErrorWrapper(async (req, res) => {
    try {
      let dataToSend = await this.model.create(req.body);

      return res.status(200).json({
        success: true,
        message: "Data created.",
        data: dataToSend,
      });
    } catch (error) {
      console.log("geldin mi", error);
      console.log("error", error);
      console.log("error", error);
      return res.status(200).json({
        success: false,
        data: {},
      });
    }
  });

  createWithUrl = asyncErrorWrapper(async (req, res) => {
    try {
      const fileName = req.fileName;

      const image = req.file;
      const photoUrlNew =
        image && image.originalname && fileName ? fileName : "";
      let url = photoUrlNew;
      console.log("re.bod", req.body);

      const dataToSend = await this.model.create({ ...req.body, url });

      switch (this.model) {
        case db.songs:
          let lyricsData = req.body.lyricsData;
          if (lyricsData) {
            lyricsData = JSON.parse(lyricsData);
          }
          let lyrics = [];

          lyricsData &&
            lyricsData.length > 0 &&
            lyricsData.map((c, index) => {
              let row = {line: index, songId: dataToSend.songId, status: "active", lyrics: c };
              console.log(row);
              lyrics.push(row);
            });

          let songCategoriesData = await db.lyrics.bulkCreate(
            lyrics
          );


          let dataSongs = await db.songs.findAll({
            where: {
              songId: dataToSend.songId,
            },
            include: [
              {
                model: db.artists,
                as: "artistInfo",
              },
              {
                model: db.lyrics,
                as: "lyricsData",
              }
            ]
          });

          console.log(dataSongs);
          return res.status(200).json({
            success: true,
            data: dataSongs,
          });

      }

      return res.status(200).json({
        success: true,
        message: "Data created.",
        data: dataToSend,
      });
    } catch (error) {
      console.log("geldin mi", error);
      console.log("error", error);
      console.log("error", error);
      return res.status(200).json({
        success: false,
        data: [],
      });
    }
  });


  createOrUpdate = asyncErrorWrapper(async (req, res) => {
    try {
      let data = req.data;
      if (data) {
        await data.update(req.body);
      } else {
        data = await this.model.create(req.body);
      }
      return res.status(200).json({
        success: true,
        message: "Data created.",
        data,
      });
    } catch (error) {
      console.log("error", error);
    }
  });
  getById = asyncErrorWrapper(async (req, res) => {
    try {
      const data = req.data;

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log("error", error);
    }
  });

  update = asyncErrorWrapper(async (req, res) => {
    const data = req.data;
    await data.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Updating is successful.",
      data,
    });
  });

  updateWithUrl = asyncErrorWrapper(async (req, res) => {
    try {
      const data = req.data;
      let { url } = data;

      console.log("url", url);
      const image = req.file;
      const fileName = req.fileName;
      console.log("image", image);
      const photoUrlNew =
        image && image.originalname && fileName ? fileName : "";

      if (image && photoUrlNew) {
        console.log("buraya girdik mi acaba");

        if (url) {
          const dir = `./uploads/${url}`;
          if (dir && dir.length > 0 && url && url.length > 0) {
            fs.unlink(dir, (err) => console.log("error", err));
          }
        }
        await data.update({ ...req.body, url: photoUrlNew });
      } else {
        await data.update(req.body);
      }

      switch (this.model) {
        case db.songs:

          try {

            await db.lyrics.destroy({
              where: {
                songId: data.songId,
              },
            });
            
            let lyricsData = req.body.lyricsData;
            if (lyricsData) {
              lyricsData = JSON.parse(lyricsData);
            }
            let lyrics = [];

            lyricsData &&
              lyricsData.length > 0 &&
              lyricsData.map((c, index) => {
                let row = { ...c, line: index, songId: data.songId, status: "active", lyrics: c };
                console.log(row);
                lyrics.push(row);
              });

            let songCategoriesData = await db.lyrics.bulkCreate(
              lyrics
            );


            let dataSongs = await db.songs.findOne({
              where: {
                songId: data.songId,
              },
              include: [
                {
                  model: db.artists,
                  as: "artistInfo",
                },
                {
                  mode: db.lyrics,
                  as: "lyricsData",
                }
              ]
            })
            return res.status(200).json({
              success: true,
              data: dataSongs,
            });
          }
          catch (error) {
            console.log("error", error);
          }
          break;
        default:
          break;
      }
      console.log("dataaa", data);
      return res.status(200).json({
        success: true,
        message: "Updating is successful.",
        data: data,
      });
    } catch (error) {
      console.log("errr", error);
    }
  });

  delete = asyncErrorWrapper(async (req, res) => {
    const data = req.data;
    await data.destroy();

    res.status(200).json({
      success: true,
      message: "Data deleted.",
    });
  });

  getDataByQuery = asyncErrorWrapper(async (req, res) => {
    const query = req.query || {};

    switch (this.model) {
      case db.userFavorites:
        let dataFavoritesSong = await this.model.findAll({
          where: query,
          include: [
            {
              model: db.users,
              as: "userInfo",
            },
            {
              model: db.songLists,
              as: "songInfo",
              include: [
                {
                  model: db.songs,
                  as: "songInfo",
                }
              ]
            },
          ],
        });

        console.log(dataFavoritesSong);
        return res.status(200).json({
          success: true,
          data: dataFavoritesSong,
        });
        break;
      case db.songs:
        console.log(query);
        try {
          let dataSongs = await this.model.findAll({
            where: query,
          })
          console.log(dataSongs);
          return res.status(200).json({
            success: true,
            data: dataSongs,
          });
        } catch (error) {
          console.log(error);
        }
        break;
    }
  });
}

module.exports = Controller;
