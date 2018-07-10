const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const zlib = require('zlib');

const app = express();

app.use(express.static('build'))
  .use(bodyParser.json())
  .get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  })
  .get('/api', (req, res) => {
    request('http://aware-ui-test1.s3.amazonaws.com/sample_data.json.txt.gz', { encoding: null }, (err, response, body) => {
      if(err) {
        throw('Error in fetching request');
      }
      zlib.gunzip(body, (error, dezipped) => {
        if (error) {
          throw('Error in dezipping file');
        }
        res.send(dezipped.toString());
      });
    });
  });

app.listen(4000, () => console.log('App listening on port 4000!'));
