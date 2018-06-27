var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose');

//APP CONFIG
mongoose.connect("mongodb://localhost/affirmations_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE/MODEL CONFIG
  var affirmSchema = new mongoose.Schema({
      name: String,
      content: String,
      image: String
  });

var Affirm = mongoose.model("Affirm", affirmSchema);



//INDEX ROUTE
app.get("/affirmations", function(req, res) {
  Affirm.find({}, function(err, affirm){
    if(err) {
      console.log("error!!");
    }else {
      res.render("index", {affirm: affirm});
    }
  })

});

app.get("/", function(req, res){
  res.redirect("/affirmations");
});


//NEW ROUTE
app.get("/affirmations/new", function(req, res){
  res.render("new");
});

//CREATE ROUTE
app.post("/affirmations", function(req, res){
  //creates the new item - as we named the form inputs affirmation[x]
  //the affirmation below is capturing all that info and creating the object
  Affirm.create(req.body.affirmation, function(err, newlycreated){
    if(err){
      res.render("new");
    } else {
      res.redirect("/affirmations");
    }
  });
});

//SHOW ROUTE - don't really need this unless we want a picture
// app.get("/affirmations/:id", function(req, res){
//   Affirm.findById(req.params.id, function(err, foundAffirm){
//     if (err){
//       res.redirect("/affirmations");
//     } else {
//       res.render("show", {affirmation: foundAffirm});
//     }
//   });
// });




app.listen(8000, function() {
  console.log("affirmations server is running!");
});

