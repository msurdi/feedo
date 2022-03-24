import { dirname, join } from "path";
import { fileURLToPath } from "url";

const findRoot = () => {
  const filename = fileURLToPath(import.meta.url);
  const currentDir = dirname(filename);
  return join(currentDir, "..");
};

export default findRoot;
