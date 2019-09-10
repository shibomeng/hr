var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

var error = "No Result Found";
var success = "Check Result Below";

router.get("/compare_price", function (req, res) {
    res.render('compare_price');
});

router.post("/compare_price", function (req, res) {
    var select = req.body.Select;
    var price = (parseInt(req.body.Price) ? parseInt(req.body.Price) : 0 );
    var title;
    if (select == "Menu") {
        title = "Menu_Total_Price";
        var sql = " SELECT * FROM ORDER_INFO natural join \
                    (SELECT ORDER_INFO_ID, sum(Total_Price) AS ? FROM \
                    (Select *, (Price* Menu_Quantity) as Total_Price FROM CONSIST_MENU natural join MENU_ITEM WHERE CONSIST_MENU.MENU_NAME = MENU_ITEM.NAME) AS NEW \
                    group by ORDER_INFO_ID \
                    having sum(Total_Price) > ? ) AS B";
        connection.query(sql, [title, price],function(err, result){
            if (err) res.render('compare_price', {error:error});
            res.render('compare_price', {result : result, success: success});
        });
    } else if (select == "Flower") {
        title = "Flower/Deoce_Total_Price";
        var sql = " SELECT * FROM ORDER_INFO natural join \
                    (SELECT ORDER_INFO_ID, sum(Total_Price) AS ? FROM \
                    (Select *, (Price* Decor_Quantity) as Total_Price FROM CONSIST_DECOR natural join DECOR_ITEM WHERE CONSIST_DECOR.DECOR_NAME = DECOR_ITEM.NAME) AS NEW \
                    group by ORDER_INFO_ID \
                    having sum(Total_Price) > ? ) AS B";
        connection.query(sql, [title, price], function (err, result) {
            if (err) res.render('compare_price', { error: error });
            res.render('compare_price', { result: result, success: success });
        });
    } else if (select == "Entertainment") {
        title = "Entertainment_Total_Price";
        var sql = " SELECT * FROM ORDER_INFO natural join \
                    (SELECT ORDER_INFO_ID, sum(Total_Price) AS ? FROM \
                    (Select *, Price as Total_Price FROM CONSIST_ENTERTAINMENT natural join ENTERTAINMENT_ITEM WHERE CONSIST_ENTERTAINMENT.ENTERTAINMENT_NAME = ENTERTAINMENT_ITEM.NAME) AS NEW \
                    group by ORDER_INFO_ID \
                    having sum(Total_Price) > ? ) AS B";       
        connection.query(sql, [title, price], function (err, result) {
            if (err) res.render('compare_price', { error: error });
            res.render('compare_price', { result: result, success: success });
        });
    } else {
        res.render('compare_price');
    }
});

module.exports = router;