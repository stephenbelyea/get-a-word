const rp = require('request-promise');
const cheerio = require('cheerio');

function getTermFromCheerioObj($) {
  return $('h1#headword').attr('title');
}

function getTypeAndValueFromDefinitionString(definition) {
  const splitDef = definition.split('   ');
  if (!splitDef || splitDef.length !== 2) {
    return null;
  }
  return {
    type: splitDef[0].trim(),
    value: splitDef[1].trim()
  }
}

function getDefinitionsFromCheerioObj($) {
  const definitions = [];
  $('#define h3 + ul > li').each(function() {
    const definition = getTypeAndValueFromDefinitionString($(this).text());
    if (definition) {
      definitions.push(definition);
    }
  })
  return definitions;
}

function getTermAndDefinitionsFromScrapeHtml(scrapeHtml) {
  const $ = cheerio.load(scrapeHtml);
  return {
    term: getTermFromCheerioObj($),
    definitions: getDefinitionsFromCheerioObj($)
  };
}

function getTermAndDefinitions() {
  const scrapeUrl = 'https://www.wordnik.com/randoml';
  return rp(scrapeUrl)
    .then(getTermAndDefinitionsFromScrapeHtml)
    .catch(function (error) {
      return error;
    });
}

const scrape = {
  getTermAndDefinitions
};

module.exports = scrape;
