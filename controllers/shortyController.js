var url = require ('url');

module.exports = function(app){

app.get('/', function(req, res){
  var location = url.parse(req.url).href;
  res.render('shorty.ejs', {location: location});
})


}
