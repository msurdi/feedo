import { Model } from "sequelize";

class Feed extends Model {
  /**
   * Initialize the model
   * @param {import("sequelize").Sequelize} db Database connection
   */
  static init(db) {
    super.init(
      {
        id: {
          type: db.Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        url: {
          type: db.Sequelize.STRING,
          unique: true,
        },
        lastSyncedAt: {
          type: db.Sequelize.DATE,
        },
        lastError: {
          type: db.Sequelize.STRING,
        },
      },
      {
        sequelize: db,
        schema: "main",
      }
    );
  }

  static associate(models) {
    Feed.hasMany(models.Article, { foreignKey: "feedId" });
  }
}

export default Feed;
