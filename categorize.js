var Q = require('q');

//var news = require("./sources/googlenews");
var google = require('./sources/googlesearch')
var wiki = require('./sources/wikisearch')


var vowelSuffix = ["ing", "al", "er", "or", "ism", "ist", "ity", "ty", "ment", "ate", "ise", "ize", "able", "ible", "ive", "y"];
var ySuffix =["ing", "ier", "iness", "iful", "ic", "ical", "ish", "ive", "ious", "ous", "al", "ication", "ize", "ise", "ist", "iment", "iship", "ism", "ior"];
var tSuffix =["ing", "ion", "ious", "ous", "er", "or", "ness", "ism", "ive", "iful", "ment", "able", "ible", "al", "y", "less", "ful"];
var Suffix = ["ing", "acy", "al", "ance", "ence", "dom", "er", "or", "ism", "ist", "ity", "ty", "ment", "ness", "ship", "sion", "tion",
				"ate", "en", "ify", "fy", "ize", "ise", "able", "ible", "al", "esque", "ful", "ic", "ical", "ious",
				"ous", "ish", "ive", "less", "y"];

function occurrencesLoose(string, subString) {
	if (subString.indexOf("anime")) return occurrencesWW(string, subString);
	var n = 0;
	var str = subString.trim();
	var lastChar = str.slice(-1);
	if (lastChar == "e")
	{
		n += occurrencesWW(string, str);
		str = str.substring(0, str.length-1);
		vowelSuffix.forEach(function(suffix) {
			n += occurrencesWW(string, str+suffix);
		});
	}
	else if (lastChar == "y")
	{
		n += occurrencesWW(string, str);
		str = str.substring(0, str.length-1);
		ySuffix.forEach(function(suffix) {
			n += occurrencesWW(string, str+suffix);
		});
	}
	else if (lastChar == "t"){
		n += occurrencesWW(string, str);
		tSuffix.forEach(function(suffix) {
			n += occurrencesWW(string, str+suffix);
		});
	}
	else 
	{
		n += occurrencesWW(string, str);
		Suffix.forEach(function(suffix) {
			n += occurrencesWW(string, str+suffix);
		});
	}

	return n;
}

/** Function count the occurrences of substring in a string;
 * @param {String} string   Required. The string;
 * @param {String} subString    Required. The string to search for;
 * @param {Boolean} allowOverlapping    Optional. Default: false;
 */
function occurrences(string, subString, allowOverlapping){

    string = string.toUpperCase()+""; 
    subString = subString.toUpperCase()+"";
    if(subString.length<=0) return string.length+1;

    var n=0, pos=0;
    var step=(allowOverlapping)?(1):(subString.length);

    while(true){
        pos=string.indexOf(subString,pos);
        if(pos>=0){ n++; pos+=step; } else break;
    }
    return(n);
}

function occurrencesWW(string, substring, allowOverlapping) {
	var substr = " " + substring + " ";
	return occurrences(string, substr, allowOverlapping);
}

exports.categorize = function (tag, categories, numCategories) {
	var categorized = [];
	var res = '[';

	Q.all([
			google.search(tag),
			wiki.search(tag)
			//news.search(tag)
		]).done(function(sources) {

		for(var i=0; i<categories.length; i++)
		{
			if (categories[i])
			{
				var count = 0;
				sources.forEach(function(source) {
					count += occurrencesLoose(source, categories[i]);
				});
				categorized.push({category: categories[i], count: count});
			}
		}

		console.log(JSON.stringify(categorized));
		/*
		categorized.sort(function(a, b) {
			return(b.count - a. count);
		});

		if (!numCategories) numCategories = 4;
		for(var i=0; i<numCategories; i++)
		{
			if(categorized[i].count)
				console.log(categorized[i].category + " : " + categorized[i].count);
		}
		*/
	});
};
