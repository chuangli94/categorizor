var request = require('request');
var htmlToText = require("html-to-text");
var fs = require("fs");
var path = require("path");
var Q = require('q');

//var resultFileText = path.join(__dirname, "googlesearch.txt");
//var resultFileHTML = path.join(__dirname, "googlesearch.html");

function writeToFile(path, data) {
	fs.writeFile(path, data, function(err) {
		if (err) 
				console.log(err);
	});
}

exports.search = function(keyword) {
	var deferred = Q.defer();
	var query = "https://www.google.ca/search?q=" + keyword;
	request(query, function(err, res, body) {
		if (err) {
			console.log(err);
			return;
		}
		//else console.log(body.toString());
		else 
		{
			//writeToFile(resultFileHTML, body.toString());
			var text = htmlToText.fromString(body, {
						wordwrap: 130,
						ignoreHref: true
				});
			//writeToFile(resultFileText, text);
			deferred.resolve(text);
		}
	});
	return deferred.promise;
}
