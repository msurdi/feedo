import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { removeFeed } from "../../../lib/core/feeds.js";
import apiHandler from "../../../lib/helpers/api/handler.js";

const handler = apiHandler();

const deleteFeedSchema = yup.object().shape({
  id: yup.string().trim().required(),
});

handler.delete(async (req, res) => {
  const { id } = await deleteFeedSchema.validate(req.query, {
    abortEarly: false,
  });

  await removeFeed(id);

  res.status(StatusCodes.OK).json({ deleted: true });
});

export default handler;
