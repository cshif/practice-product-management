require('dotenv').config();

const loginInfo = {
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB
};

module.exports = loginInfo;
