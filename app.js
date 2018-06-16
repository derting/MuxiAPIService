const express = require('express');
const app = express();
var bodyParser = require('body-parser');

var hymnary_1 = require('./src/hymnary_1.json');
var hymnary_2 = require('./src/hymnary_2.json');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var version = 'V1.0.3';
// set our port
var port = process.env.PORT || 8080;

// ROUTERS FOR OUR API
var router = express.Router();

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// accessed at GET http://127.0.0.1:8080/api)
router.get('/', (req, res) => {
  res.status(200).send('Muxi Project').end();
});

// http://127.0.0.1:8080/api/muxi/version
router.get('/muxi/version', (req, res) => {
  //res.status(200).send('V1.0.0').end();
  res.status(200).json({ version: version }).end();
});

// api/muxi/hymnary_1
router.get('/muxi/hymnary_1', (req, res) => {
  res.status(200).send(hymnary_1).end();
});

// api/muxi/hymnary_2
router.get('/muxi/hymnary_2', (req, res) => {
  res.status(200).send(hymnary_2).end();
});


// <example>
//  url: http://127.0.0.1:8080/api/muxi/hymnary/
//  body: {"key":1,"file":"file1","content":"asd/nasfwr/nasf"}
// </example>
router.patch('/muxi/hymnary/', function (req, res) {
  console.log('[patch]hymnary ' + req.body.file + ", key:" + req.body.key);
  
  //node: 這裡可能需要debug，才知道如何update json file.

  //fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
  //    if (err){
  //        console.log(err);
  //    } else {
  //    obj = JSON.parse(data); //now it an object
  //    obj.table.push({id: 2, square:3}); //add some data
  //    json = JSON.stringify(obj); //convert it back to json
  //    fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
  //}});
  res.status(200).send({ "success": true }).end();
});

app.listen(port, () => {
  console.log(`MuxiProject version ${version}, listening on port ${port}`);
  console.log('Press Ctrl+C to quit.');
});

