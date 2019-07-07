const express = require('express');
const { getTermAndDefinitions } = require('./term-and-definitions');

const app = express();

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

app.get('/term-and-definitions', async (req, res, next) => {
  try {
    const termAndDefinitions = await getTermAndDefinitions();
    res.json(termAndDefinitions);
  } catch (e) {
    res.status(500).send({ error: e });
  }
 });
