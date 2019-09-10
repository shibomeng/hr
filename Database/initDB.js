var connection = require('./DB_Connection.js');

function init() {    
    var pdfFile = `create Table if not exists Candidate(
            Name varchar(100) primary key,
            Resume varchar(8000) not null,
            Email varchar(25),
            Job_Type varchar(10),
            Begin date,
            End date,
            Experience varchar(3000)
        )`;

    connection.query(pdfFile, function(err, results, fields) {
        if (err) throw err;
    });   
};

module.exports = init;