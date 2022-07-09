import authMiddleware from "../../middleware/auth.js";

const withAuth = (handler) => async (context) => {
  const { req, res } = context;
  await authMiddleware(req, res);
  if (res.ended) {
    return { props: {} };
  }
  return handler(context);
};
export default withAuth;
