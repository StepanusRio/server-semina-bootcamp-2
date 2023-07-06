const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  urlDb: process.env.MONGOODB_CONNECTIONS,
  jwtExpiration: '24h',
  jwtSecret: 'jwtSecret',
};
