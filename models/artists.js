"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class artists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      artists.hasMany(models.songs, {
        foreignKey: "artistId",
        as: "songsData",
      });
    }
  }
  artists.init(
    {
      artistId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      artistName: {
        type: DataTypes.STRING,
      },
      artistDescription: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
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
          return this.artistId;
        },
      },
      name: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.artistName;
        },
      },
    },
    {
      sequelize,
      modelName: "artists",
      timestamps: false,
    }
  );
  return artists;
};
