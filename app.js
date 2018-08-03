var express = require('express')
var app = express()
var mysql= require('mysql');
const fs = require('fs');
var users = require('./users');
// var ulil = require("./router")
var router = require("./router")



app.use(function(req, res, next){
	global.connection = mysql.createConnection({
	  	host     : 'localhost',
	  	user     : 'root',
      database : 'databoks',
      password: "kduk2017"
	});
	connection.connect();
	next();
});
app.use('/users', users);
app.use("/download", router);
// app.use("/download", ulil);

app.listen(3000)
/////////////////////////////////////////////////////////////////////////




// var express = require('express')
// var app = express()

// app.get('/', function (req, res) {res.send('Hello world')})
// app.listen(3000)

// app.all('/secret', function (req, res, next) {
//     console.log('Accessing the secret section ...')
//     next() // pass control to the next handler
//   })
// app.listen(3000)

// //Merubah fungsi dalam
// app.get('/',function(req, rest, next) {console.log("Yang pertama"), next()}
//  ,function (req, res) {res.send('Yang kedua')})
// app.listen(3000)

// var coba1 = function (req, res, next) {console.log('Coba 1'), next()}
// var coba2 = function (req, res) {res.send('Coba 2')}  
// app.get('/coba/2', [coba1, coba2])
// app.listen(3000)

//Merubah fungsi luar
// app.route('/book').get(function (req, res) {res.send('Get a random book')})
//   .post(function (req, res) {res.send('Add a book')})
//   .put(function (req, res) {res.send('Update the book')})
// app.listen(3000)

//Membuat multiple router
// var birds = require('./birds')
// var fish = require('./fish')

// app.use('/birds', birds)
// app.use('/fish', fish)

// app.param('id', function (req, res, next, id) {
//     console.log('CALLED ONLY ONCE');
//     next();
//   });
  
//   app.get('/user/:id', function (req, res, next) {
//     console.log('although this matches');
//     next();
//   });
  
//   app.get('/user/:id', function (req, res) {
//     console.log('and this matches too');
//     res.end();
//   });











//route = URL
// handler = Function
