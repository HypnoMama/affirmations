var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    =require('mongoose');


    app.listen(process.env.PORT, process.env.IP, function() {
      console.log("affirmations server is running!");
    });