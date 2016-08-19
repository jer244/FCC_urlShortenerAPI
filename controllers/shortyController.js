var url = require ('url');

module.exports = function(app){
var location = url.href;

app.get('/', function(req, res){
  res.render('shorty.ejs', {location: location});
})


}
