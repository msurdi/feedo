import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { fetchFeed } from "../../../lib/core/sync.js";
import authenticate from "../../../lib/middleware/authenticate.js";
import handle from "../../../lib/middleware/handle.js";
import { articleListPresenter } from "../../../lib/presenters.js";

const previewFeedSchema = yup.object().shape({
  url: yup.string().trim().url().required(),
});

const get = async (req, res) => {
  const { url } = await previewFeedSchema.validate(req.query, {
    abortEarly: false,
  });

  const { name, articles } = await fetchFeed(url);

  res
    .status(StatusCodes.OK)
    .json({ name, articles: articles.map(articleListPresenter) });
};

export default authenticate(handle({ get }));
