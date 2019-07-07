const scrape = require('./scrape')

scrape.getTermAndDefinitions()
  .then(data => {
    console.log(data)
  })
