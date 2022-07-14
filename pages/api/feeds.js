import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { createFeed } from "../../lib/core/feeds.js";
import authenticate from "../../lib/middleware/authenticate.js";
import handle from "../../lib/middleware/handle.js";

const createFeedSchema = yup.object().shape({
  url: yup.string().trim().url().required(),
  name: yup.string().trim().required(),
});

const post = async (req, res) => {
  const values = await createFeedSchema.validate(req.body, {
    abortEarly: false,
  });

  const feed = await createFeed(values);

  res.status(StatusCodes.CREATED).json({ feed });
};

export default authenticate(handle({ post }));
