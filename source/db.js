var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_sugimoth',
  password        : '4343',
  database        : 'cs340_sugimoth'
});

module.exports.pool = pool;
