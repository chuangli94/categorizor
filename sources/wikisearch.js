var wiki = require("wikipedia-js");
var htmlToText = require("html-to-text");
var fs = require("fs");
var path = require("path");
var Q = require('q');


//var resultFilePath = path.join(__dirname, "wikisearch.html");
//var resultTextFile = path.join(__dirname, "wikisearch.txt");

function writeToFile(path, data) {
	fs.writeFile(path, data, function(err) {
		if (err) 
				console.log(err);
	});
}

exports.search = function wikiSearch(tag) {

	var deferred = Q.defer();
	var options = {query: tag, format: "html", summaryOnly: false};

	wiki.searchArticle(options, function(err, result) {
		if(err)
			console.log("Fucked up");
		else {
			//console.log("Query Successful");

			// logs the html to file
			//writeToFile(resultFilePath, result);

			// converts html to text
			var text = htmlToText.fromString(result, {
				wordwrap: 130,
				ignoreHref: true
			});
			//writeToFile(resultTextFile, text);
			
			if (!text)
			{
				text = result;
			}

			deferred.resolve(text);
		}
	});
	return deferred.promise;
}
