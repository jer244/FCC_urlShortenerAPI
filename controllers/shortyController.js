'use strict';

var url = require('url');
var mongoose = require('mongoose');
require('dotenv').config();


//connect to the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST);
mongoose.set('debug', true);

//create a schema (like a blueprint for the data)
var shortSchema = new mongoose.Schema({
    url: String,
    alias: String,
    shortUrl: String
});

//create model for our schema - capitilized because it's a model
var Shorty = mongoose.model('Shorty', shortSchema);

//variable to hold number to use as alias
var count = 0;

module.exports = function(app) {

        //set count to number of documents in db - keep alias unique
        Shorty.count({}, function(err, curcount) {
            count = curcount + 1000
        });

        //routes
        app.get('/', serveLandingPage);
        app.get('/new/*', addNewUrl); //use wildcard routing (*) in order to accept URL as parameter
        app.get('/:alias', getLongUrl);

        //serve landing page with updated host URL
        function serveLandingPage(req, res) {
            var location = req.protocol + '://' + req.get('host') + req.originalUrl;
            res.render('shorty.ejs', {
                location: location
            });
        } //end serveLandingPage

        //redirect from short URL. serve error if short URL not found in DB
        function getLongUrl(req, res) {
            Shorty.findOne({
                alias: Number(req.params.alias)
            }, function(err, results) {
                if (err) throw err;
                if (results) {
                    res.redirect(results.url);
                } else {
                    res.json({
                        error: 'URL not found'
                    });
                }
            });
        } //end getLongUrl

        //check if new URL is valid and save if valid, else serve error
        function addNewUrl(req, res) {
            if (validateURL(req.params[0])) {
                var location = req.protocol + '://' + req.get('host');
                var newShorty = new Shorty({
                    url: req.params[0],
                    alias: Number(count),
                    shortUrl: location + '/' + count
                });
                count++;

                newShorty.save(function(err, data) {
                    if (err) throw err;
                    res.json({
                        url: data.url,
                        shortUrl: data.shortUrl
                    });
                });
            } else {
                res.json({
                    error: 'invalid URL'
                });
            }
        } //end addNewUrl

        //check if URL is valid format.
        // Regex from https://gist.github.com/dperini/729294
        function validateURL(url) {
            var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
            return regex.test(url);
        } //end validateURL

    } //end module.exports
