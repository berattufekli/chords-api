"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class lyrics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      lyrics.belongsTo(models.songs, {
        foreignKey: {
          name: "songId",
          allowNull: false,
        },
        onDelete: "cascade",
      });
    }
  }
  lyrics.init(
    {
      lyricsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      lyrics: {
        type: DataTypes.STRING,
      },
      line: {
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
          return this.lyricsId;
        },
      },
    },
    {
      sequelize,
      modelName: "lyrics",
      timestamps: false,
    }
  );
  return lyrics;
};
