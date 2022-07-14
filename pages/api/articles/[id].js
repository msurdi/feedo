import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { markArticlesAsRead } from "../../../lib/core/articles.js";
import authenticate from "../../../lib/middleware/authenticate.js";
import handle from "../../../lib/middleware/handle.js";

const articleIdSchema = yup.object().shape({
  id: yup.string().trim().required(),
});

const markAsReadSchema = yup.object().shape({
  isRead: yup.boolean().required(),
});

const put = async (req, res) => {
  const { id } = await articleIdSchema.validate(req.query, {
    abortEarly: false,
  });

  const { isRead } = await markAsReadSchema.validate(req.body, {
    abortEaryly: false,
  });

  if (isRead) {
    await markArticlesAsRead([id]);
  }

  res.status(StatusCodes.OK).json({ isRead });
};

export default authenticate(handle({ put }));
