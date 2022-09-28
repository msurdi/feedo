import { flow } from "lodash-es";
import withAuth from "./with-auth.js";
import withSerialize from "./with-serialize.js";

const withDefault = flow(withAuth, withSerialize);

export default withDefault;
