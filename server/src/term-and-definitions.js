const rp = require("request-promise");
const cheerio = require("cheerio");

function getTermFromCheerioObj($) {
  return $("h1#headword").attr("title");
}

function getTypeAndValueFromDefinitionString(definition, idx) {
  const splitDef = definition.split("   ");
  if (!splitDef || splitDef.length !== 2) {
    return null;
  }
  return {
    id: idx + 1,
    type: splitDef[0].trim(),
    value: splitDef[1].trim()
  };
}

function getDefinitionsFromCheerioObj($) {
  const definitions = [];
  $("#define h3 + ul > li").each(function(idx) {
    const definition = getTypeAndValueFromDefinitionString($(this).text(), idx);
    if (definition) {
      definitions.push(definition);
    }
  });
  return definitions;
}

function getTermAndDefinitionsFromScrapeHtml(scrapeHtml) {
  const $ = cheerio.load(scrapeHtml);
  return {
    term: getTermFromCheerioObj($),
    definitions: getDefinitionsFromCheerioObj($)
  };
}

async function getTermAndDefinitions() {
  try {
    const scrapeHtml = await rp("https://www.wordnik.com/randoml");
    return getTermAndDefinitionsFromScrapeHtml(scrapeHtml);
  } catch (e) {
    return Promise.reject("Could not get term and definitions");
  }
}

const termAndDefinitions = {
  getTermAndDefinitions
};

module.exports = termAndDefinitions;
