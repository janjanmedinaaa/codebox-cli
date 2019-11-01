const program = require('commander')
const package = require('../package.json')

module.exports = () => {
  program.version(package.version)
  program
    .option('-i, --init', 'Initialize Codebox')
    .option('-n, --new', 'Create new Programming Language')
    .option('-s, --snip', 'Save new Code snippet')
    .option('-l, --language <type>', 'Set Programming Language')
    .option('-t, --title <type>', 'Set Code snippet title')
    .option('-f, --find', 'Find Code snippets')
    .option('-k, --keyword <type>', 'Keyword to search')
    .option('-e, --export', 'Export Codebox snippets')
  
  program.parse(process.argv)
  return program
}