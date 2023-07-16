"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chords.belongsTo(models.songs,{
        foreignKey: {
          name: "songId",
          allowNull: false,
        },
        onDelete: "cascade",
      });
    }
  }
  chords.init(
    {
      chordId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      chordNo: {
        type: DataTypes.INTEGER,
      },
      chordName: {
        type: DataTypes.STRING,
      },
      C_tone: {
        type: DataTypes.STRING,
      },
      C_sharp_tone: {
        type: DataTypes.STRING,
      },
      Db_tone: {
        type: DataTypes.STRING,
      },
      D_tone: {
        type: DataTypes.STRING,
      },
      D_sharp_tone: {
        type: DataTypes.STRING,
      },
      Eb_tone: {
        type: DataTypes.STRING,
      },
      E_tone: {
        type: DataTypes.STRING,
      },
      F_tone: {
        type: DataTypes.STRING,
      },
      F_sharp_tone: {
        type: DataTypes.STRING,
      },
      Gb_tone: {
        type: DataTypes.STRING,
      },
      G_tone: {
        type: DataTypes.STRING,
      },
      G_sharp_tone: {
        type: DataTypes.STRING,
      },
      Ab_tone: {
        type: DataTypes.STRING,
      },
      A_tone: {
        type: DataTypes.STRING,
      },
      A_sharp_tone: {
        type: DataTypes.STRING,
      },
      Bb_tone: {
        type: DataTypes.STRING,
      },
      B_tone: {
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
          return this.chordId;
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
      modelName: "chords",
      timestamps: false,
    }
  );
  return chords;
};
