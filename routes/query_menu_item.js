var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/query_menu_item", function (req, res) {
    var menu;
    connection.query("SELECT NAME FROM MENU_ITEM", function (err, result) {
        if (err) throw err;
        menu = result;
    });
    var decor;
    connection.query("SELECT NAME FROM DECOR_ITEM", function (err, result) {
        if (err) throw err;
        decor = result;
    });
    var entertainment;
    connection.query("SELECT NAME FROM ENTERTAINMENT_ITEM", function (err, result) {
        if (err) throw err;
        entertainment = result;
        res.render("query_menu_item", {menu:menu, decor:decor, entertainment:entertainment})
    });
});

router.post("/query_menu_item", function (req, res) {
    var name = req.body.Name;
    var sql;
    var Menu_sql = "SELECT * FROM SUPPLIER \
                natural join SUPPLY_MENU \
                natural join MENU_ITEM \
                where MENU_ITEM.Name = ? and MENU_ITEM.Name = SUPPLY_MENU.Menu_Name \
                and SUPPLIER.Supplier_Name = SUPPLY_MENU.Supplier_Name ";

    var Decor_sql = "   SELECT * FROM SUPPLIER \
                        natural join SUPPLY_DECOR \
                        natural join DECOR_ITEM \
                        where DECOR_ITEM.Name = ? and DECOR_ITEM.Name = SUPPLY_DECOR.Decor_Name \
                        and SUPPLIER.Supplier_Name = SUPPLY_DECOR.Supplier_Name";   
    
    var Entertainment_sql = "   SELECT * FROM  SUPPLIER \
                        natural join SUPPLY_ENTERTAINMENT \
                        natural join ENTERTAINMENT_ITEM \
                        where ENTERTAINMENT_ITEM.Name = ? and ENTERTAINMENT_ITEM.Name = SUPPLY_ENTERTAINMENT.Entertainment_Name \
                        and SUPPLIER.Supplier_Name = SUPPLY_ENTERTAINMENT.Supplier_Name "; 

    var result1 = 0;
    var result2 = 0;
    var result3 = 0;
    connection.query(Menu_sql, [name], function (err, Minfo){
        if (err) throw err;
        // console.log(Minfo);
        connection.query(Decor_sql, [name], function (err, Dinfo){
            if (err) throw err;
            connection.query(Entertainment_sql, [name], function (err, Einfo){
                if (err) throw err;
                var info;
                if (Minfo.length != 0) {
                    info = Minfo;
                    sql = "SELECT MENU_NAME, count(*) AS NumOf_Orders \
                    FROM CONSIST_MENU \
                    where  MENU_NAME = ?"
                    connection.query(sql, [name], function (err, result) {
                        if (err) throw err;
                        if (result.length != 0) {
                            result1 = result[0]['NumOf_Orders'];
                        }
                        info[0]['Numof_Orders'] = result1;
                    });
                   
                } else if (Dinfo.length != 0) {
                    info = Dinfo;
                    
                    sql = "SELECT DECOR_NAME, count(*) AS NumOf_Orders \
                        FROM CONSIST_DECOR \
                        where  DECOR_NAME = ?"
                    connection.query(sql, [name], function (err, result) {
                        if (err) throw err;
                        if (result.length != 0) {
                            result2 = result[0]['NumOf_Orders'];
                        }
                        info[0]['Numof_Orders'] = result2;
                    });
                    
                } else if (Einfo.length != 0) {
                    info = Einfo;
                    sql = "SELECT Entertainment_Name, count(*) AS NumOf_Orders \
                            FROM CONSIST_ENTERTAINMENT \
                            where  Entertainment_Name = ?"
                    connection.query(sql, [name], function (err, result) {
                        if (err) throw err;
                        if (result.length != 0) {
                            result3 = result[0]['NumOf_Orders'];
                        }
                        info[0]['Numof_Orders'] = result3;
                    });
                    
                } 
                var menu;
                connection.query("SELECT NAME FROM MENU_ITEM", function (err, result) {
                    if (err) throw err;
                    menu = result;
                });
                var decor;
                connection.query("SELECT NAME FROM DECOR_ITEM", function (err, result) {
                    if (err) throw err;
                    decor = result;
                });
                var entertainment;
                connection.query("SELECT NAME FROM ENTERTAINMENT_ITEM", function (err, result) {
                    if (err) throw err;
                    entertainment = result;
                    delete info[0].Name;
                    var success = "Check Result Below!";
                    res.render("query_menu_item", { info: info, menu: menu, decor: decor, entertainment: entertainment, success:success })
                });
            })
        })
    })
});

module.exports = router;



        