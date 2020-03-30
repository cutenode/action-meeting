const fs = require('fs')

async function stringifyMarkdownTemplate (template) {
  // fetch the passed template and make it a string
  const fetchedTemplate = await fs.readFile(template)
  const stringifiedTemplate = await fetchedTemplate.toString('utf8')

  return stringifiedTemplate
}

module.exports = stringifyMarkdownTemplate