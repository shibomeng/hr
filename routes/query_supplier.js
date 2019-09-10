var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/query_supplier", function(req, res) {
    connection.query("SELECT Supplier_Name FROM SUPPLIER", function(err,supplier){
        if (err) {
            req.flash("error", err.sqlMessage);
            res.redirect("/home");
        }
        res.render('query_supplier', {supplier: supplier});
    });
   
});

router.post("/query_supplier", function(req, res) {
    var select = req.body.good;
    var name = (req.body.supplier!=" " ? req.body.supplier : null);
    var success = "Check Result Below";

    if (select == "Menu") {
        var sql = "Select * FROM SUPPLIER INNER JOIN SUPPLY_MENU ON \
                    SUPPLIER.Supplier_Name = SUPPLY_MENU.Supplier_Name \
                    WHERE (? IS NULL or SUPPLIER.Supplier_Name = ?)";
        connection.query(sql, [name, name], function(err,result){
            if (err) {
                req.flash("error", err.sqlMessage);
                res.redirect("/home");
            }
            // result.forEach(function(e) {
            //     delete e.Name;
            // });
            connection.query("SELECT Supplier_Name FROM SUPPLIER", function (err, supplier) {
                if (err) {
                    req.flash("error", err.sqlMessage);
                    res.redirect("/home");
                }
                res.render('query_supplier', { result: result, supplier: supplier, success:success });
            });
        });
    } else if (select == "Flower") {
        var sql = "Select * FROM SUPPLIER INNER JOIN SUPPLY_DECOR ON\
                    SUPPLIER.Supplier_Name = SUPPLY_DECOR.Supplier_Name\
                    WHERE (? IS NULL or SUPPLIER.Supplier_Name = ?)";
        connection.query(sql, [name, name], function (err, result) {
            if (err) {
                req.flash("error", err.sqlMessage);
                res.redirect("/home");
            }
            connection.query("SELECT Supplier_Name FROM SUPPLIER", function (err, supplier) {
                if (err) {
                    req.flash("error", err.sqlMessage);
                    res.redirect("/home");
                }
                res.render('query_supplier', { result: result, supplier: supplier, success:success });
            });
        });
    } else if (select == "Entertainment") {
        var sql = "Select * FROM SUPPLIER INNER JOIN SUPPLY_ENTERTAINMENT ON\
                    SUPPLIER.Supplier_Name = SUPPLY_ENTERTAINMENT.Supplier_Name\
                    WHERE (? IS NULL or SUPPLIER.Supplier_Name = ?)";
        connection.query(sql, [name, name], function (err, result) {
            if (err) {
                req.flash("error", err.sqlMessage);
                res.redirect("/home");
            }
            connection.query("SELECT Supplier_Name FROM SUPPLIER", function (err, supplier) {
                if (err) {
                    req.flash("error", err.sqlMessage);
                    res.redirect("/home");
                }
                res.render('query_supplier', {result: result, supplier: supplier, success:success });
            });
        });
    } else {
        var sql = "SELECT * FROM SUPPLIER WHERE (? IS NULL or SUPPLIER.Supplier_Name = ?)";
        connection.query(sql, [name, name], function (err, result) {
            if (err) {
                req.flash("error", err.sqlMessage);
                res.redirect("/home");
            }
            connection.query("SELECT Supplier_Name FROM SUPPLIER", function (err, supplier) {
                if (err) {
                    req.flash("error", err.sqlMessage);
                    res.redirect("/home");
                }
                res.render('query_supplier', { result: result, supplier: supplier, success:success });
            });
        });
    }
});

module.exports = router;