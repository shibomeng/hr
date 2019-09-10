var express = require("express");
var router = express.Router();
var fs = require('fs');
var connection = require('../Database/DB_Connection.js');

router.get("/query_client", function (req, res) {
    connection.query("SELECT * FROM Candidate", function (err, result) {
        if (err) throw err;
        res.render("query_client", {File_ID : result}); 
    });
});

router.get("/download/:File_ID", function (req, res) {
    res.download('upload/'+req.params.File_ID);
    // connection.query("SELECT Resume FROM Candidate", [req.params.File_ID], function (err, result) {
    //     if (err) throw err;
        
    //     // fs.open(__dirname+'/upload/'+req.params.File_ID, 'w', function(err, fd) {  
    //     //     if (err) {
    //     //         throw 'could not open file: ' + err;
    //     //     }
            
    //     //     var data = result[0].Data;
    //     //     // console.log(data);

    //     //     fs.write(fd, data, 0, data.length, null, function(err) {
    //     //         if (err) {
    //     //             throw 'error writing file: ' + err;
    //     //         }
    //     //         fs.close(fd, function() {
    //     //             console.log('file written successfully');
    //     //             // res.setHeader('Content-disposition', 'attachment; filename=myfile.pdf');
    //     //             // console.log(__dirname+'/download/'+req.params.File_ID);
    //     //             res.download(__dirname+'/download/'+req.params.File_ID);
    //     //             // res.redirect("query_client");
    //     //         });
    //     //     });
    //     // });
    // });
});

router.post("/query_client", function (req, res) {
    
});

module.exports = router;