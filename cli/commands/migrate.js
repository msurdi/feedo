const path = require("path");
const execa = require("execa");

const migrate = async () => {
  process.chdir(path.join(__dirname, ".."));
  const command = execa("npm run migrate:production", { shell: true });
  command.stderr.pipe(process.stderr);
  command.stdout.pipe(process.stdout);
  await command;
};

module.exports = migrate;
