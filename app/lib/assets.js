import fs from "fs-extra";
import { join } from "path";
import { fileURLToPath } from "url";

const assets = await fs.readJson(
  fileURLToPath(join(import.meta.url, "../../../public/dist/manifest.json"))
);

export default assets;
