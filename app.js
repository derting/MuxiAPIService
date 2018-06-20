const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const fs = require('fs');

//var hymnary_1 = require('./src/hymnary_1.json');
//var hymnary_2 = require('./src/hymnary_2.json');
var hymnary_1 = {};
var hymnary_2 = {};

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

// http://127.0.0.1:8080/api/muxi/hymnary_2
router.get('/muxi/:fileName', (req, res) => {
  readHymnaryJson(req.params.fileName);
  res.status(200).send(eval(req.params.fileName)).end();
});

// <example>
//  method: patch
//  url: http://127.0.0.1:8080/api/muxi/hymnary/
//  body: {"key":1,"file":"file1","content":"asd/nasfwr/nasf"}
// </example>
router.patch('/muxi/hymnary/', function (req, res) {
  console.log('[patch]hymnary ' + req.body.file + ", key:" + req.body.key);
  var result = UpdateFileHandler("M", req.body.file, req.body);
  res.status(result.status).send({ "success": result.success, "message": result.message }).end();
});

// <example>
//  method: delete
//  url: http://127.0.0.1:8080/api/muxi/hymnary/
//  body: {"key":1,"file":"file1"}
// </example>
router.delete('/muxi/hymnary/', function (req, res) {
  console.log('[delete]hymnary ' + req.body.file + ", key:" + req.body.key);
  var result = UpdateFileHandler("D", req.body.file, req.body);
  res.status(result.status).send({ "success": result.success, "message": result.message }).end();
});

app.listen(port, () => {
  console.log(`MuxiProject version ${version}, listening on port ${port}`);
  console.log('Press Ctrl+C to quit.');
});


//---------------

function UpdateFileHandler(option, fileName, requestBody) {
  fileURL = './src/' + fileName + '.json';
  if (CheckFileExist(fileURL) == false) {
    return { "status": 500, "success": false, "message": "No file." };
  }

  var fileContent = fs.readFileSync(fileURL, 'utf8');
  fileContent = JSON.parse(fileContent);
  if (option == "M") {
    UpdateFileContent(fileContent, requestBody);
  }
  else if (option == "D") {
    DeleteFileContent(fileContent, requestBody);
  }

  //Upgrade hymnary's version
  fileContent.version = upgradeVersion(fileContent.version);
 
  var fileContent_md = JSON.stringify(fileContent);
  fs.writeFileSync(fileURL, fileContent_md, 'utf8');

  return { "status": 200, "success": true, "message": "" };
}

function UpdateFileContent(fileContent, requestObj) {
  var result = fileContent[requestObj.file].find(function (x) { return x.key == requestObj.key; });
  result.content = requestObj.content;
}

function DeleteFileContent(fileContent, requestObj) {
  var idx = fileContent[requestObj.file].findIndex(x => x.key == requestObj.key);
  fileContent[requestObj.file].splice(idx, 1);
}

function CheckFileExist(path) {
  if (fs.existsSync(path))
    return true;
  else
    return false;
}

//read Json File
function readHymnaryJson(fileName) {
  var path = './src/' + fileName + '.json';
  var fileContent = fs.readFileSync(require.resolve(path), 'utf8');
  eval(fileName + ' = JSON.parse(fileContent);');
}

function upgradeVersion(originalVersion)
{
  return originalVersion += 1;
}