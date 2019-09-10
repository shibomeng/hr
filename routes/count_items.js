var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

var error = "No Result Found";
var success = "Check Result Below";

router.get("/count_items", function (req, res) {
    connection.query("SELECT ORDER_INFO_ID FROM ORDER_INFO", function (err, orderID) {
        if (err) throw err;
        res.render('count_items', {orderID : orderID});
    });
});

router.post("/count_items", function (req, res) {
    var select = req.body.Select;
    var OrderID = req.body.OrderID;
    if (select == "Menu") {
        var sql = "select Order_Info_ID, count(*) As Total_Num\
                    from ORDER_INFO natural join CONSIST_MENU\
                    where ORDER_INFO_ID = ?"

        connection.query(sql, [OrderID], function(err, result) {
            if (err) {
                req.flash("error", err.sqlMessage);
                res.redirect("/home");
            }
            connection.query("SELECT ORDER_INFO_ID FROM ORDER_INFO", function (err, orderID) {
                if (err) {
                    req.flash("error", err.sqlMessage);
                    res.redirect("/home");
                }
                res.render('count_items', {result: result, orderID: orderID, success:success});
            });
        });
    } else if (select == "Flower") {
        var sql = "select Order_Info_ID, count(*) As Total_Num\
                    from ORDER_INFO natural join CONSIST_DECOR\
                    where ORDER_INFO_ID = ?"

        connection.query(sql, [OrderID], function (err, result) {
            if (err) throw err;
            connection.query("SELECT ORDER_INFO_ID FROM ORDER_INFO", function (err, orderID) {
                if (err) throw err;
                res.render('count_items', { result: result, orderID: orderID, success: success });
            });
        });
    } else if (select == "Entertainment") {
        var sql = "select Order_Info_ID, count(*) As Total_Num\
                    from ORDER_INFO natural join CONSIST_ENTERTAINMENT\
                    where ORDER_INFO_ID = ?"

        connection.query(sql, [OrderID], function (err, result) {
            if (err) throw err;
            connection.query("SELECT ORDER_INFO_ID FROM ORDER_INFO", function (err, orderID) {
                if (err) throw err;
                res.render('count_items', { result: result, orderID: orderID, success: success });
            });
        });
    } else {
        connection.query("SELECT ORDER_INFO_ID FROM ORDER_INFO", function (err, orderID) {
            if (err) throw err;
            res.render('count_items', { orderID: orderID });
        });
    }
});

module.exports = router;