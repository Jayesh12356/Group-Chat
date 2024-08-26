const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class GCLike extends Model {}

  GCLike.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      message_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reaction_type: {
        type: DataTypes.ENUM("like", "love", "laugh", "sad", "angry"),
        defaultValue: "like",
      },
      liked_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "GCLike",
      tableName: "gc_likes",
      timestamps: false,
    }
  );

  return GCLike;
};
