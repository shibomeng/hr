var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'upload/' });
var app = express();
var path = require("path");

router.get("/", function(req, res) {
    res.render("home");
});

router.get("/home", function(req, res) {
    res.render("home");
});

router.get("/new_client", function(req, res) {
   res.render("new_client");
});

router.post("/upload-single", upload.single('fileToUpload'), function(req, res) {
    var file = req.file;
    var name = req.body.name;
    var job = req.body.job;
    var email = req.body.email ? req.body.email : null;
    var begin = req.body.begin ? req.body.begin : null;
    var end = req.body.end ? req.body.end : null;
    var Experience = req.body.experience ? req.body.experience : null;


    fs.rename(file.path.toString(), "upload/"+file.originalname, function(err){   
        if(err){
            res.render("home", {error : "失败"});
        }else{
            // fs.readFile("upload/"+file.originalname, function (err, data) {
            //     if (err) throw err;
            //     console.log(data);
            // });
            // var binaryData = Buffer.from(data);
            // console.log(data.toString());
            var sql = " insert into Candidate (Name, Resume, Email, Job_Type, Begin, End, Experience) \
                        values (?, ?, ?, ?, ?, ?, ?)";
            connection.query(sql, [name, ""+file.originalname, email, job, begin, end, Experience], function (err, result) {
                if (err) throw err;
                res.render("home", {success : "成功"});
            });
        }
    });
});

module.exports = router;