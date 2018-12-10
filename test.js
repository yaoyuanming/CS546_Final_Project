//Test

const express = require("express");
const bodyParser = require("body-parser");
const exhbs = require('express-handlebars');
const configRoutes = require('./routes');
const static = express.static(__dirname + "/public");
const static2 = express.static(__dirname + "/node_modules");
const cookieParser = require('cookie-parser');

const app = express();
app.use("/public", static);
app.use("/node_modules", static2)
app.use(cookieParser());

app.engine('handlebars', exhbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));




configRoutes(app);
app.listen(3000, function() {
    console.log("Server running on port 3000");
})