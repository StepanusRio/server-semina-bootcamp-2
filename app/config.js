const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  urlDb: process.env.MONGOODB_CONNECTIONS,
  jwtExpiration: process.env.EXPIRED_KEY,
  jwtSecret: process.env.SECRETE_KEY,
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD,
};
