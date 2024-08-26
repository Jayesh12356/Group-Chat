const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class GCUser extends Model {}

  GCUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: true, // or false, depending on your requirements
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true, // or false, depending on your requirements
      },
      contact_number: {
        type: DataTypes.STRING(20),
        allowNull: true, // or false, depending on your requirements
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
    },
    {
      sequelize,
      modelName: "GCUser",
      tableName: "gc_users",
      timestamps: false,
    }
  );

  return GCUser;
};
