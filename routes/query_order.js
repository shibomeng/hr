var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/query_order", function(req, res) {
   connection.query("SELECT ORDER_INFO_ID FROM ORDER_INFO", function (err, orderID) {
       if (err) throw err;
       connection.query("SELECT Client_ID FROM CLIENT", function (err, clientID) {
            if (err) throw err;
            connection.query("SELECT Event_Type FROM EVENT", function(err, Event){
                if (err) throw err;
                connection.query("SELECT Location FROM VENUE", function(err, Venue){
                    if (err) throw err;
                    connection.query("SELECT Name FROM MENU_ITEM", function(err, Menu){
                        if (err) throw err;
                        connection.query("SELECT Name FROM DECOR_ITEM", function (err, Flower){
                            if (err) throw err;
                            connection.query("SELECT Name FROM ENTERTAINMENT_ITEM", function (err, Music){
                                if (err) throw err;
                                res.render("query_order", {orderID : orderID, clientID: clientID, Event : Event, Venue:Venue, Menu:Menu, Flower:Flower, Music:Music});});});});});});
        });
   });
});


router.post("/query_order", function (req, res) {
    var clientID = (req.body.ClientID ? req.body.ClientID : null);  
    var orderID = (req.body.OrderID ? req.body.OrderID : null);
    var invitee = (parseInt(req.body.invitee) ? parseInt(req.body.invitee) : null);
    var price = (parseFloat(req.body.price) ? parseFloat(req.body.price) : null);
    var comparsion = req.body.comparsion;
    var priceCompare = req.body.priceCompare;
    var MenuComparsion = req.body.MenuComparsion;
    var FWcomparsion = req.body.FWcomparsion;
    var event = (req.body.Event ? req.body.Event : null);
    var venue = (req.body.Venue ? req.body.Venue : null);
    var menu = (req.body.Menu ? req.body.Menu : null);
    var menu_quantity = (req.body.MenuQuantity ? req.body.MenuQuantity : null);
    var fw = (req.body.FW ? req.body.FW : null);
    var flower_quantity = (req.body.FWQuantity ? req.body.FWQuantity : null);
    var me = (req.body.ME ? req.body.ME : null);

    var error = "No Result Found";
    var success = "Check Result Below";

    var sql = ' select * \
                from ORDER_INFO \
                natural join CONSIST_MENU \
                natural join CONSIST_DECOR \
                natural join CONSIST_ENTERTAINMENT \
                where (? is null or ORDER_INFO_ID = ?) \
                and (? is null or Client_ID = ?) \
                and (? is null or Event_Type = ?) \
                and (? is null or Location = ?) \
                and (? is null or CONSIST_MENU.Menu_Name = ?) \
                and (? is null or CONSIST_DECOR.Decor_Name = ?) \
                and (? is null or CONSIST_ENTERTAINMENT.Entertainment_Name = ?) ';

    var input = [orderID, orderID, clientID, clientID, event, event, 
                    venue, venue, menu, menu, fw, fw, me, me];

    var appendInvitee;
    if (comparsion) {
        if (comparsion === "less") {
            appendInvitee = "AND (Num_Of_Invitees < ?) ";
        } else {
            appendInvitee = "AND (Num_Of_Invitees > ?) ";
        }
    } else {
        appendInvitee = "AND (Num_Of_Invitees = ?) ";
    }
    if (invitee) {
        sql = sql.concat(appendInvitee);
        input.push(invitee);
    }

    var appendMenu;
    if (MenuComparsion) {
        if (MenuComparsion === "less") {
            appendMenu = "AND (CONSIST_MENU.Menu_Quantity < ?) ";
        } else {
            appendMenu = "AND (CONSIST_MENU.Menu_Quantity > ?) ";
        }
    } else {
        appendMenu = "AND (CONSIST_MENU.Menu_Quantity = ?) ";
    }
    if (menu_quantity) {
        sql = sql.concat(appendMenu);
        input.push(menu_quantity);
    }

    var appendFW;
    if (FWcomparsion) {
        if (FWcomparsion === "less") {
            appendFW = "and (CONSIST_DECOR.Decor_Quantity < ?)";
        } else {
            appendFW = "and (CONSIST_DECOR.Decor_Quantity > ?)";
        }
    } else {
        appendFW = "and (CONSIST_DECOR.Decor_Quantity = ?)";
    }
    if (flower_quantity) {
        sql = sql.concat(appendFW);
        input.push(flower_quantity);
    }

    var appendPrice;
    if (priceCompare) {
        if (priceCompare === "less") {
            appendPrice = "and (Total_Price < ?)";
        } else {
            appendPrice = "and (Total_Price > ?)";
        }
    } else {
        appendPrice = "and (Total_Price = ?)";
    }
    if (price) {
        sql = sql.concat(appendPrice);
        input.push(price);
    }

    connection.query(sql, input, 
    function (err, rows, fields) {
        if (err) throw err;
        if (rows.length == 0) {
            connection.query("SELECT ORDER_INFO_ID FROM ORDER_INFO", function (err, orderID) {
                if (err) throw err;
                connection.query("SELECT Client_ID FROM CLIENT", function (err, clientID) {
                    if (err) throw err;
                    connection.query("SELECT Event_Type FROM EVENT", function(err, Event){
                        if (err) throw err;
                        connection.query("SELECT Location FROM VENUE", function(err, Venue){
                            if (err) throw err;
                            connection.query("SELECT Name FROM MENU_ITEM", function(err, Menu){
                                if (err) throw err;
                                connection.query("SELECT Name FROM DECOR_ITEM", function (err, Flower){
                                    if (err) throw err;
                                    connection.query("SELECT Name FROM ENTERTAINMENT_ITEM", function (err, Music){
                                        if (err) throw err;
                                        res.render("query_order", {orderID : orderID, clientID: clientID, Event : Event, Venue:Venue, Menu:Menu, Flower:Flower, Music:Music, rows:rows, error:error});});});});});});
                });
            });
        } else {
            connection.query("SELECT ORDER_INFO_ID FROM ORDER_INFO", function (err, orderID) {
                if (err) throw err;
                connection.query("SELECT Client_ID FROM CLIENT", function (err, clientID) {
                    if (err) throw err;
                    connection.query("SELECT Event_Type FROM EVENT", function(err, Event){
                        if (err) throw err;
                        connection.query("SELECT Location FROM VENUE", function(err, Venue){
                            if (err) throw err;
                            connection.query("SELECT Name FROM MENU_ITEM", function(err, Menu){
                                if (err) throw err;
                                connection.query("SELECT Name FROM DECOR_ITEM", function (err, Flower){
                                    if (err) throw err;
                                    connection.query("SELECT Name FROM ENTERTAINMENT_ITEM", function (err, Music){
                                        if (err) throw err;
                                        res.render("query_order", {orderID : orderID, clientID: clientID, Event : Event, Venue:Venue, Menu:Menu, Flower:Flower, Music:Music, rows:rows, success:success});});});});});});
                });
            });
        }
    });
});

router.delete("/delete_order/:id", function (req, res) {
    var orderID = req.params.id;
    var sql = 'delete from ORDER_INFO where ORDER_INFO_ID = ?';

    connection.query(sql, [orderID], function (err, rows, fields) {
        if (err) {
            req.flash("error", err.sqlMessage);
            res.redirect("/home");
        }
        if (rows.length == 0) {
            req.flash("error", "Delete Failed");
        } else {
            req.flash("success", "Successfully Deleted!");
        }
        res.redirect('/home');
    });
});

module.exports = router;