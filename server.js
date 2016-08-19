var express = require ('express');

var app = express();
var shortyController = require('./controllers/shortyController')

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controller
shortyController(app);

//listen to port 3000 (local)
//app.listen(3000);
//console.log('You are listening to port 3000');

//for heroku
app.listen(process.env.PORT, function(){
console.log('Listening to default PORT')
});
