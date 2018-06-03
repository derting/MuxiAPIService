
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Muxi Project').end();
});

app.get('/muxi/version', (req, res) => {
  res.status(200).send('V1.0.0').end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

