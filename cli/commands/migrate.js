const execa = require("execa");

const migrate = async () => {
  const command = execa("npm run migrate:production", { shell: true });
  command.stderr.pipe(process.stderr);
  command.stdout.pipe(process.stdout);
  await command;
};

module.exports = migrate;
