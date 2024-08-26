const { Sequelize } = require("sequelize");

class SequelizeConn {
  async connectDB() {
    try {
      if (!SequelizeConn.sequelize) {
        if (global.gConfig && global.gConfig.db_connections) {
          const {
            IP: host,
            username,
            password,
            database,
            port,
          } = global.gConfig.db_connections;

          const sequelizeOptions = {
            host,
            port,
            dialect: "mysql",
            dialectOptions: {
              dateStrings: true,
              typeCast: true,
            },
          };

          sequelizeOptions.logging = false;
          // if (timezone) sequelizeOptions.timezone = timezone;

          // connect to database
          const sequelize = new Sequelize(
            database,
            username,
            password,
            sequelizeOptions
          );

          await sequelize.authenticate();

          SequelizeConn.sequelize = sequelize;

          console.log("connected to database");

          this.importModels();
        } else {
          return false;
        }
      }

      return true;
    } catch (err) {
      throw err;
    }
  }

  async closeConnection() {
    try {
      if (SequelizeConn.sequelize) await SequelizeConn.sequelize.close();

      SequelizeConn.sequelize = null;

      return true;
    } catch (err) {
      throw err;
    }
  }

  async importModels() {
    const GCGroupMember = require("../databaseModels/gc_group_members")(
        SequelizeConn.sequelize
      ),
      GCGroup = require("../databaseModels/gc_groups")(SequelizeConn.sequelize),
      GCLike = require("../databaseModels/gc_likes")(SequelizeConn.sequelize),
      GCMessage = require("../databaseModels/gc_messages")(
        SequelizeConn.sequelize
      ),
      GCUser = require("../databaseModels/gc_users")(SequelizeConn.sequelize),
      GCGroupRole = require("../databaseModels/gc_group_roles")(
        SequelizeConn.sequelize
      ),
      GCMessageWithReactions =
        require("../databaseModels/gc_message_reactions_view")(
          SequelizeConn.sequelize
        );

    SequelizeConn.schema = {};
    SequelizeConn.schema[GCGroupMember.name] = GCGroupMember;
    SequelizeConn.schema[GCGroup.name] = GCGroup;
    SequelizeConn.schema[GCLike.name] = GCLike;
    SequelizeConn.schema[GCMessage.name] = GCMessage;
    SequelizeConn.schema[GCUser.name] = GCUser;
    SequelizeConn.schema[GCGroupRole.name] = GCGroupRole;
    SequelizeConn.schema[GCMessageWithReactions.name] = GCMessageWithReactions;
  }
  async setRelations() {}

  getSequelizeConn() {
    return SequelizeConn.sequelize;
  }

  getSequelizeSchema() {
    return SequelizeConn.schema;
  }
}

module.exports = SequelizeConn;
