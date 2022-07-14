import authMiddleware from "../../middleware/authenticate.js";
import withSSRMiddleware from "../../next-ssr-middleware.js";

const withAuth = withSSRMiddleware(authMiddleware);
export default withAuth;
