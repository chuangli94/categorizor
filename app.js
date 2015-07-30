var categorizer = require('./categorize');
var fs = require('fs');
var readLine = require('readline');
var path = require("path");

var categoriesFilePath = path.join(__dirname, "categories.txt");
var args = process.argv.slice(2);

var QUERY = "";
var NUMBER_OF_TAGS;

/*
var rl = readLine.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', function(query) {
	rl.close();
});


rl.prompt("Enter tag: ", function(query) {
	rl.close();
});
*/

function categorize(query, numCategories) {	
	fs.readFile(categoriesFilePath, function(err, data) {
		if(err)
		{
			console.log("Error reading categories file");
		}
		else
		{
			var categories = data.toString().split("\r\n");

			categorizer.categorize(query, categories, numCategories);
		}
	});
}

if (args.length <= 0) {
	return;
} else {
	QUERY = args[0];
	if (args[1]) {
		NUMBER_OF_TAGS = parseInt(args[1]);
	}
	categorize(QUERY, NUMBER_OF_TAGS);
}
