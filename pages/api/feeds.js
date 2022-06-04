import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { createFeed } from "../../lib/core/feeds.js";
import apiHandler from "../../lib/helpers/api/handler.js";

const handler = apiHandler();

const createFeedSchema = yup.object().shape({
  url: yup.string().trim().url().required(),
});

handler.post(async (req, res) => {
  const values = await createFeedSchema.validate(req.body, {
    abortEarly: false,
  });

  const feed = await createFeed(values);

  res.status(StatusCodes.CREATED).json({ feed });
});

export default handler;
