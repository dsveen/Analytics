const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
var request = require('request');
var zlib = require('zlib');

app.use(express.static('build'))
.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/api', (req, res) => {
	request('http://aware-ui-test1.s3.amazonaws.com/sample_data.json.txt.gz', {encoding: null}, (err, response, body) => {
		zlib.gunzip(body, (err, dezipped) => {
			res.send(dezipped.toString());
		});
	});
});

app.listen(4000, () => console.log('App listening on port 4000!'));