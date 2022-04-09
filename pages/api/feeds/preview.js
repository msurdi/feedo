import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { fetchFeed } from "../../../lib/core/sync";
import apiHandler from "../../../lib/helpers/api/handler";
import { articleListPresenter } from "../../../lib/presenters";

const handler = apiHandler();

const previewFeedSchema = yup.object().shape({
  url: yup.string().trim().url().required(),
});

handler.get(async (req, res) => {
  const { url } = await previewFeedSchema.validate(req.query, {
    abortEarly: false,
  });

  const articles = await fetchFeed(url);

  res.status(StatusCodes.OK).json(articles.map(articleListPresenter));
});

export default handler;
