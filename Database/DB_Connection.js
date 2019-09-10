var mysql = require('mysql');

var connection = mysql.createConnection({
    user: 'shibomeng',
    password: 'Meng199776',
    host: 'testmysql.cfo4n3gnn6xc.ca-central-1.rds.amazonaws.com',
    database: 'hr'
});

module.exports = connection;