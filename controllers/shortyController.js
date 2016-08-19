var url = require ('url');

module.exports = function(app){

app.get('/', function(req, res){
  var location = req.url;
  res.render('shorty.ejs', {location: location});
})


}
