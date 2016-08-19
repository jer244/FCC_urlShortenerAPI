var url = require ('url');

module.exports = function(app){
var location = url.port;

app.get('/', function(req, res){
  res.render('shorty.ejs', {location: location});
})


}
