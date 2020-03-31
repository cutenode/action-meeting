const fs = require('fs').promises
const catchError = require('../lib/catchError')

async function stringifyMarkdownTemplate (template) {
  try {
    // fetch the passed template and make it a string
    const fetchedTemplate = await fs.readFile(template)
    const stringifiedTemplate = await fetchedTemplate.toString('utf8')

    return stringifiedTemplate
  } catch (error) {
    catchError(error)
  }
}

module.exports = stringifyMarkdownTemplate
