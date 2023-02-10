import fs from "fs-extra";
import { join } from "path";
import { fileURLToPath } from "url";

const packageJSON = await fs.readJson(
  fileURLToPath(join(import.meta.url, "../../../package.json"))
);

export default packageJSON;
