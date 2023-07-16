"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class songChords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      songChords.belongsTo(models.songs, {
        foreignKey: {
          name: "songId",
          allowNull: false,
        },
        onDelete: "cascade",
      });
      songChords.belongsTo(models.chords, {
        foreignKey: {
          name: "chordId",
          allowNull: false,
        },
        onDelete: "cascade",
        as: "chordInfo",
      });
    }
  }
  songChords.init(
    {
      songChordId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      line: {
        type: DataTypes.INTEGER,
      },
      position: {
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
          return this.songChordId;
        },
      },
      name: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.chord;
        },
      },
    },
    {
      sequelize,
      modelName: "songChords",
      timestamps: false,
    }
  );
  return songChords;
};
