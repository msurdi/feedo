import fs from "fs-extra";

const touch = async (path) => {
  await fs.ensureFile(path);
  const now = new Date();
  await fs.utimes(path, now, now);
};

export default touch;
