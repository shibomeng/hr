var express = require("express");
var router = express.Router();
var connection = require('../Database/DB_Connection.js');

router.get("/update_order", function(req, res) {
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
                        res.render("update_order", {orderID : orderID, clientID: clientID, Event : Event, Venue:Venue, Menu:Menu, Flower:Flower, Music:Music});});});});});});
      });
   });
});

router.post("/update_order", function(req, res) {
   var orderID = (req.body.OrderID ? req.body.OrderID : null);

   connection.query('select Client_ID, Num_Of_Invitees, Location, Event_Type \
                     from ORDER_INFO where ORDER_INFO_ID = ?', [orderID],
   function (err, rows, fields) {
      var Client_ID = rows[0].Client_ID;
      var invitee = (parseInt(req.body.invitee) ? parseInt(req.body.invitee) : rows[0].Num_Of_Invitees); 
      var venue = (req.body.Venue ? req.body.Venue : rows[0].Location);
      var event = (req.body.Event ? req.body.Event : rows[0].Event_Type);

      var sql = ' update ORDER_INFO \
                  set Num_Of_Invitees = ? \
                  , Location = ? \
                  , Event_Type = ? \
                  where ORDER_INFO_ID = ? and Client_ID = ?';

      var input = [invitee, venue, event, orderID, Client_ID];

      connection.query(sql, input, function (err, rows, fields) {
         if (err) throw err;
         if (rows.length == 0) {
            req.flash("error", err.sqlMessage);
            res.redirect("/home");
         } 
      });

      connection.query('select Menu_Name, Menu_Quantity\
                        from CONSIST_MENU where ORDER_INFO_ID = ?', [orderID],
      function (err, menu_result, fields) {
         var menu = (req.body.Menu ? req.body.Menu : menu_result[0].Menu_Name);
         var menu_quantity = (req.body.MenuQuantity ? req.body.MenuQuantity : menu_result[0].Menu_Quantity);

         sql = '  update CONSIST_MENU \
                  set Menu_Name = ? \
                  , Menu_Quantity = ? \
                  where ORDER_INFO_ID = ?';

         input = [menu, menu_quantity, orderID];

         connection.query(sql, input, function (err, rows, fields) {
            if (err) throw err;
            if (rows.length == 0) {
               req.flash("error", err.sqlMessage);
               res.redirect("/home");
            } 
         });
      });

      connection.query('select Decor_Name, Decor_Quantity\
                        from CONSIST_DECOR where ORDER_INFO_ID = ?', [orderID],
      function (err, decor_result, fields) {
         var fw = (req.body.FW ? req.body.FW : decor_result[0].Decor_Name);
         var flower_quantity = (req.body.FWQuantity ? req.body.FWQuantity : decor_result[0].Decor_Quantity);

         sql = '  update CONSIST_DECOR \
                  set Decor_Name = ? \
                  , Decor_Quantity = ? \
                  where ORDER_INFO_ID = ?';

         input = [fw, flower_quantity, orderID];
         
         connection.query(sql, input, function (err, rows, fields) {
            if (err) throw err;
            if (rows.length == 0) {
               req.flash("error", err.sqlMessage);
               res.redirect("/home");
            } 
         });
      });

      connection.query('select Entertainment_Name \
                        from CONSIST_ENTERTAINMENT where ORDER_INFO_ID = ?', [orderID],
      function (err, enter_result, fields) {
         var me = (req.body.ME ? req.body.ME : enter_result[0].Entertainment_Name);

         sql = '  update CONSIST_ENTERTAINMENT \
                  set Entertainment_Name = ? \
                  where ORDER_INFO_ID = ?';

         input = [me, orderID];
         
         connection.query(sql, input, function (err, rows, fields) {
            if (err) throw err;
            if (rows.length == 0) {
               req.flash("error", err.sqlMessage);
               res.redirect("/home");
            } 
         });
      });
      connection.query("SELECT * FROM ORDER_INFO WHERE ORDER_INFO_ID = ?", [orderID], function(err,result){
         if (err) throw err;
         var success = "Check Result Below";
         res.render("update_order", {result:result, success: success});
      });
      });
});

module.exports = router;