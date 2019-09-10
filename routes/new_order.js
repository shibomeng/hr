var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/new_order", function(req, res) {
   var clientID;
   connection.query("SELECT Client_ID FROM CLIENT", function (err, result) {
      if (err) throw err;
      clientID = result;
   });
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
                  res.render("new_order", {clientID:clientID, Event:Event, Venue:Venue, Menu:Menu, Flower:Flower, Music:Music});});});});});});

});

router.post("/new_order", function(req, res) {
   var clientID = req.body.ClientID;
   var orderID = req.body.OrderID;
   var numOfInvitees = req.body.invitee;
   var event = req.body.Event;
   var venue = req.body.Venue;
   var total = 0;

   var sql = "INSERT INTO ORDER_INFO (ORDER_INFO_ID, Client_ID, Num_Of_Invitees, Location,Event_Type) VALUES (?, ?, ?, ?, ?)";
   connection.query(sql, [orderID, clientID, numOfInvitees, venue, event], function (err, result) {
      if (err) {
         req.flash("error", err.sqlMessage);
         res.redirect("/home");
         var client;
         connection.query("SELECT Client_ID FROM CLIENT", function (err, result) {
            if (err) throw err;
            client = result;
         });
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
                        res.render("new_order", {clientID:client, Event:Event, Venue:Venue, Menu:Menu, Flower:Flower, Music:Music});});});});});});
         return;
      }
      var id;
      var menu = req.body.Menu;
      var quantity = req.body.MenuQuantity;
      connection.query("SELECT Name, Price FROM MENU_ITEM WHERE Name = ?", [menu], function(err, result){
         if (err) {
            req.flash("error", err.sqlMessage);
            res.redirect("/home");
         }
         connection.query("INSERT INTO CONSIST_MENU (Menu_Name, ORDER_INFO_ID,Client_ID,Menu_Quantity) VALUES (?,?,?,?)", [result[0].Name, orderID, clientID, quantity],
            function (err, result) {
               if (err) {
                  req.flash("error", err.sqlMessage);
                  res.redirect("/home");
               }
         });
         total += parseInt(quantity) * parseInt(result[0].Price);
      });
      

      var decor = req.body.FW;
      quantity = req.body.FWQuantity;
      connection.query("SELECT Name, Price FROM DECOR_ITEM WHERE Name = ?", [decor], function (err, result) {
         if (err) {
            req.flash("error", err.sqlMessage);
            res.redirect("/home");
         }
         connection.query("INSERT INTO CONSIST_DECOR (Decor_Name, ORDER_INFO_ID,Client_ID,Decor_Quantity) VALUES (?,?,?,?)", [result[0].Name, orderID, clientID, quantity],
            function (err, result) {
               if (err) {
                  req.flash("error", err.sqlMessage);
                  res.redirect("/home");
               }
         });
         total += parseInt(quantity) * parseInt(result[0].Price);
      });
     

      var entertainment = req.body.ME;
      connection.query("SELECT Name, Price FROM ENTERTAINMENT_ITEM WHERE Name = ?", [entertainment], function (err, result) {
         if (err) {
            req.flash("error", err.sqlMessage);
            res.redirect("/home");
         }
         connection.query("INSERT INTO CONSIST_ENTERTAINMENT (Entertainment_Name, ORDER_INFO_ID,Client_ID) VALUES (?,?,?)", [result[0].Name, orderID, clientID],
            function (err, result) {
               if (err) {
                  req.flash("error", err.sqlMessage);
                  res.redirect("/home");
               }
         });
         total += parseInt(result[0].Price);
         connection.query("UPDATE ORDER_INFO SET Total_Price = ? WHERE ORDER_INFO_ID = ?", [total, orderID], function (err, result) {
            if (err) {
               req.flash("error", err.sqlMessage);
               res.redirect("/home");
            }
         });
      });
      req.flash("success", "Successfully Added New Order!");
      res.redirect("/home");
   });
});

module.exports = router;