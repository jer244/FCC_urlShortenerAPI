var url = require ('url');

module.exports = function(app){

app.get('/', function(req, res){
  var location = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('shorty.ejs', {location: location});
})
}
