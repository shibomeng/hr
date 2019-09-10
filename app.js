var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");

//MYSQL DB
var initSQL = require('./Database/initDB.js');

initSQL();  

//Requiring routes
var update_client = require("./routes/update_client"),
    new_client = require("./routes/new_client"),
    new_order = require("./routes/new_order"),
    update_order = require("./routes/update_order"),
    query_client = require("./routes/query_client"),
    query_order = require("./routes/query_order"),
    query_menu_item = require("./routes/query_menu_item"),
    query_supplier = require("./routes/query_supplier");
    compare_price = require("./routes/compare_price");
    count_items = require("./routes/count_items")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

app.use(require("express-session")({
    secret: "dumb",
    resave: false,
    saveUninitialized: false
}));
app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(query_order);
app.use(query_client);
app.use(update_client);
app.use(new_client);
app.use(new_order);
app.use(update_order);
app.use(query_menu_item);
app.use(query_supplier);
app.use(compare_price);
app.use(count_items);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("SEREVER STARTED!!");
});