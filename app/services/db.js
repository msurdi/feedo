import { Sequelize } from "sequelize";
import config from "../config.js";
import Article from "../models/article.js";
import Feed from "../models/feed.js";

const models = [Article, Feed];

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: config.databasePath,
});

export const setupDatabase = async () => {
  models.forEach((model) => model.init(sequelize));
  models.forEach(
    (model) => model.associate && model.associate(sequelize.models)
  );

  await sequelize.sync({ alter: true });
};
