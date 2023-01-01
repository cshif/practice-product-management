const mysql = require('mysql2');
const loginInfo = require('./loginInfo');
const db = mysql.createConnection(loginInfo);

db.connect(error => {
  if (error) throw error;
  console.log('connected!');
});

module.exports = db;
