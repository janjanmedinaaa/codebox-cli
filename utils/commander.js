const program = require('commander')
const package = require('../package.json')

module.exports = () => {
  program.version(package.version)
  program
    .option('-i, --init', 'Initialize Codebox')
    .option('-n, --new', 'Create new Programming Language')
    .option('-s, --snip', 'Save new Code snippet')
    .option('-f, --find', 'Find Code snippets')
    .option('-u, --update', 'Update Code snippet')
    .option('-e, --export', 'Export Codebox snippets')
    .option('-c, --clipboard', 'Code snippet will be from the clipboard')
    .option('-l, --language <type>', 'Set Programming Language')
    .option('-t, --title <type>', 'Set Code snippet title')
    .option('-k, --keyword <type>', 'Keyword to search')
  
  program.parse(process.argv)
  return program
}