import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { removeFeed } from "../../../lib/core/feeds.js";
import authenticate from "../../../lib/middleware/authenticate.js";
import handle from "../../../lib/middleware/handle.js";

const deleteFeedSchema = yup.object().shape({
  id: yup.string().trim().required(),
});

const del = async (req, res) => {
  const { id } = await deleteFeedSchema.validate(req.query, {
    abortEarly: false,
  });

  await removeFeed(id);

  res.status(StatusCodes.OK).json({ deleted: true });
};

export default authenticate(handle({ del }));
