const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class GCMessageWithReactions extends Model {}

  GCMessageWithReactions.init(
    {
      message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_on: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      modified_on: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
      },
      message_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      like_id: {
        type: DataTypes.INTEGER,
      },
      liker_id: {
        type: DataTypes.INTEGER,
      },
      reaction_type: {
        type: DataTypes.ENUM("like", "love", "laugh", "sad", "angry"),
        defaultValue: "like",
      },
      liked_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      like_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "GCMessageWithReactions",
      tableName: "gc_messages_with_reactions",
      timestamps: false,
    }
  );

  return GCMessageWithReactions;
};
