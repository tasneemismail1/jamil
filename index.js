const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");//
var session = require('cookie-session');
var bodyParser = require("body-parser");//
const fileUpload = require("express-fileupload");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false })); //athkm f static folder
app.use(bodyParser.json());
////////////////////////////
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(morgan("common"));
require("dotenv").config();

app.use(fileUpload());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

const indexRouter = require("./routes/index");
const viewRouter = require("./routes/views");
const adminRouter = require("./routes/admin");


app.use("/user", indexRouter); //user
app.use("/", viewRouter);
app.use("/admin", adminRouter);

////////////////////////////////////////////




app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});


mongoose.connect("mongodb+srv://malak2102056:56850906@cluster0.da8eto8.mongodb.net/jamila")
   .then((result) => {
      
      app.listen(5050);
      console.log("connected to db");
   })
   .catch((e) => {
      console.log(e)
   })
   

module.exports = app;
