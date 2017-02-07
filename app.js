var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var request = require('request');
var util = require('util');

var name, skin, condition;

http.createServer(function(req, res) {
  if (req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
    	name = fields.name;
    	skin = fields.skin;
    	condition = fields.condition;

	    res.writeHead(200, {'content-type': 'text/plain'});
	    res.write('received upload:\n\n');
	    res.end();
    });

    return;
  }

  // show weapon info form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form method="post" action="/">' +
		'<label for="name">Weapon Name:</label>' +
	    '<input id="name" type="text" name="name">' +
	    '<br>' +
	    '<label for="name">Skin:</label>' +
	    '<input id="skin" type="text" name="skin">' +
	    '<br>' +
	    '<label for="name">Condition:</label>' +
	    '<input id="condition" type="text" name="condition">' +
    	'<br>' +
    	'<input type="submit" value="Submit">' +
	'</form>'
  );
}).listen(3000);

var baseUrl = 'http://steamcommunity.com/market/listings/730/';
var endUrl = '/render?start=0&currency=3&language=english&format=json'

var url = baseUrl + name + ' | ' + skin + ' (' + condition + ')' + endUrl;
request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parseResponse(body);
	}
});

function parseResponse(text) {
	// price + fee
}

