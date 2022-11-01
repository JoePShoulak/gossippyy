const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Follow extends Model {}

Follow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Follow",
  }
);

module.exports = Follow;
