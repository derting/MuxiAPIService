const express = require('express');
const app = express();
var bodyParser = require('body-parser');

var hymnary = require('./src/hymnary.json');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 8080;        

// ROUTERS FOR OUR API
var router = express.Router();

// REGISTER OUR ROUTES -------------------------------
app.use('/api',router);

// accessed at GET http://127.0.0.1:8080/api)
router.get('/', (req, res) => {
  res.status(200).send('Muxi Project').end();
});

// api/muxi/version
router.get('/muxi/version', (req, res) => {
  //res.status(200).send('V1.0.0').end();
  res.status(200).json({version: 'V1.0.1'}).end();
});

// api/muxi/hymnary
router.get('/muxi/hymnary', (req, res) => {
  //res.status(200).send('V1.0.0').end();
  res.status(200).send(hymnary).end();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log('Press Ctrl+C to quit.');
});

