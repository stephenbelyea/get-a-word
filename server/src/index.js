const express = require('express');
const { getTermAndDefinitions } = require('./scrape');

const app = express();

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

app.get('/term-and-definitions', async (req, res, next) => {
  const termAndDefinitions = await getTermAndDefinitions();
  res.json(termAndDefinitions);
 });
