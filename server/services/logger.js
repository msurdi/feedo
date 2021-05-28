const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  json: false,
  transports: [new winston.transports.Console()],
});

logger.stream = {
  write(message) {
    logger.info(message.trim());
  },
};
