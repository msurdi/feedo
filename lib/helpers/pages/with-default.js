import { flow } from "lodash-es";
import { withLazy } from "../../next-lazy.js";
import withAuth from "./with-auth.js";
import withSerialize from "./with-serialize.js";

const withDefault = flow(withAuth, withLazy, withSerialize);

export default withDefault;
