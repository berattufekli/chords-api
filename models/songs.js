"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class songs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      songs.belongsTo(models.artists, {
        foreignKey: {
          name: "artistId",
          allowNull: false,
        },
        onDelete: "cascade",
        as: "artistInfo",
      });
      songs.hasMany(models.songChords, {
        foreignKey: "songId",
        as: "chordsData",
      });
      songs.hasMany(models.lyrics, {
        foreignKey: "songId",
        as: "lyricsData",
      });
      songs.hasMany(models.chords, {
        foreignKey: "songId",
        as: "chordInfo",
      });
      
    }
  }
  songs.init(
    {
      songId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      songName: {
        type: DataTypes.STRING,
      },
      songAlbum: {
        type: DataTypes.STRING,
      },
      originalTone: {
        type: DataTypes.INTEGER,
      },
      easyTone: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("active", "passive"),
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      id: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.songId;
        },
      },
      name: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.songName;
        },
      },
    },
    {
      sequelize,
      modelName: "songs",
      timestamps: false,
    }
  );
  return songs;
};
