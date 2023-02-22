import { formatDistanceToNowStrict } from "date-fns";
import downsize from "downsize";
import { Model } from "sequelize";

class Article extends Model {
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
        guid: {
          type: db.Sequelize.STRING,
        },
        link: {
          type: db.Sequelize.STRING,
        },
        title: {
          type: db.Sequelize.STRING,
        },
        content: {
          type: db.Sequelize.STRING,
        },
        author: {
          type: db.Sequelize.STRING,
        },
        commentsLink: {
          type: db.Sequelize.STRING,
        },
        isRead: {
          type: db.Sequelize.BOOLEAN,
          defaultValue: false,
        },
        publishedAt: {
          type: db.Sequelize.DATE,
        },
        feedId: {
          type: db.Sequelize.INTEGER,
          references: {
            model: db.model.Feed,
            key: "id",
          },
        },
      },
      {
        indexes: [{ unique: true, fields: ["guid", "feedId"] }],
        sequelize: db,
        schema: "main",
      }
    );
  }

  static associate(models) {
    Article.belongsTo(models.Feed, {
      foreignKey: "feedId",
    });
  }

  get excerpt() {
    return downsize(this.content, { words: 70, append: "..." });
  }

  get timeAgo() {
    return formatDistanceToNowStrict(this.publishedAt);
  }
}

export default Article;
