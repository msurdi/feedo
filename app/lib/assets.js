import fs from "fs-extra";
import { join } from "path";
import { fileURLToPath } from "url";

const manifestPath = fileURLToPath(
  join(import.meta.url, "../../../public/dist/manifest.json")
);

const assets = (await fs.exists(manifestPath))
  ? await fs.readJson(manifestPath)
  : {};

export default assets;
