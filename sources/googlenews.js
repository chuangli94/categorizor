var GoogleNews, googleNews, track;
var fs = require("fs");
var path = require("path");
var request = require('request');
var htmlToText = require("html-to-text");
var Q = require('q');

var resultFilePath = path.join(__dirname+"/news/", "news");
  
GoogleNews = require('google-news');
googleNews = new GoogleNews();


function writeToFile(path, data) {
	fs.writeFile(path, data, function(err) {
		if (err) 
				console.log(err);
	});
}

exports.search = function(keyword) {
	var d = Q.defer();
	var text = "";
	var count = 0;
	googleNews.stream(keyword, function(stream) {
	  stream.on(GoogleNews.DATA, function(data) {
	  	request({
	  		uri: data.link
	  	}, function(err, res, body) {
	  		if (!err)
	  		{
	  							count++;

	  			console.log("YAyYY");
		  		//writeToFile(resultFilePath + "_" + count.toString() + ".html", body);	
	  			text += htmlToText.fromString(body, {
					wordwrap: 130,
					ignoreHref: true
				});
				//writeToFile(resultFilePath + "_" + count.toString() + ".txt", text);	
	  		} else {
	  			console.log("Error");
	  		}
	  	});  
	  	while (count == 3) {
  				console.log("news articles!!!");
	  			d.resolve("fashion aksjfljalskdjfkad fashion alskdjflksadf fashion asdkjflsdjf fashion fashion");	
			  	return d.promise;
	  		}
	  });
	  
	  stream.on(GoogleNews.ERROR, function(error) {
	    return console.log('Error Event received... ' + error);
	  });
	});
}