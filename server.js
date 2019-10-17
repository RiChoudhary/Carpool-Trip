const express = require('express');
bodyParser = require('body-parser'),
nodeoutlook = require('nodejs-nodemailer-outlook'), 
assert = require('assert');
const app = express();
const port = process.env.PORT || 5000;
const host = '0.0.0.0';
app.use(express.static(__dirname + '/public')); // this publishes all files in public folderr




//mongo client
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_tsmh6n22:6rubiqvsbo5m86u56crd3aja@ds235658.mlab.com:35658/heroku_tsmh6n22";
  
//bodyparser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.listen(port, host, function(){
    console.log(`Example app listening on port ${port}!`);
}); 

app.get('/', (req, res) => res.send('index.html') ); //display the index.html when you go to host

app.post('/postData', function (req, res){
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        let db = client.db('heroku_tsmh6n22');
        db.collection("users").insertOne(req.body, function(err) {
          if (err) throw err;
            console.log("1 document inserted"); 
            console.log("Sign up successful"); 
          
        });
      }) 
       res.redirect('signupSuccess.html');

});

app.post('/checkLogin', function (req, res){
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        let db = client.db('heroku_tsmh6n22');
        console.log(req.body.inputemail);
        console.log(req.body.inputpassword);
        if(req.body.inputemail == "test@gmail.com"){
            if(req.body.inputpassword == "test")
             res.redirect('loginSuccess.html');
             else
             res.redirect('loginFailure.html');
        }
        else{
            res.redirect('loginFailure.html');
        }
        db.collection("users").find({ "email":{ $in: [req.body.inputemail ] }  }, { projection: { password: 1 } }).toArray(function(err, result) {
             if (err) throw err;
            console.log(result.toString());
          });
      }) 
        
      

});