const clipboardy = require('clipboardy')
const logger = require('@janjanmedinaaa/clean/lib/Logs')
const fs = require('fs')
const nv = require('node-vim')

const files = require('./utils/files')
const tools = require('./utils/tools')
const inquirer  = require('./utils/inquirer');

const CODE_FOLDER = 'codebox-codes'
const FOLDER_PWD = `${files.getCodeboxDirLocation()}/${CODE_FOLDER}`
const LANGUAGES_PWD = `${FOLDER_PWD}/languages.json`

const initializeCodebox = () => {
  files.writeFolder(FOLDER_PWD)
  files.writeJSONFile({ languages: [] }, LANGUAGES_PWD)

  logger.success('Codebox Initialize. See \'codebox --help\'.')
}

const createProgrammingLanguage = async(program) => {
  var languageResult = await inquirer.checkForLanguageNew(program.language)
  var filename = tools.createCodeSnippetFileName(FOLDER_PWD, languageResult.language)
  var languageData = files.readJSONFile(LANGUAGES_PWD)
  var jsonData = tools.createLanguage(languageResult.language)

  if (fs.existsSync(filename)) {
    logger.warning('Programming Language already exists. See \'codebox --help\'.')
    return
  }

  languageData.languages.push({
    id: tools.createNewID(languageData.languages),
    language: languageResult.language,
    location: filename,
    date: Date()
  })

  files.writeJSONFile(languageData, LANGUAGES_PWD)
  files.writeJSONFile(jsonData, filename)

  logger.success(`${languageResult.language} Programming Language created.`)
}

const createCodeSnippet = async(program) => {
  var languageData = files.readJSONFile(LANGUAGES_PWD)
  var languageResult = await inquirer.checkForLanguageExisting(program.language, languageData.languages)

  var filename = tools.createCodeSnippetFileName(FOLDER_PWD, languageResult.language)
  var snippetTitleResult = await inquirer.checkForCodeSnippetTitle(program.title)

  if (!fs.existsSync(filename)) {
    logger.error('No Programming Language found. See \'codebox --help\'.')
    return
  }

  var code = (program.clipboard) ? clipboardy.readSync() : await nv.editorSync({})

  var jsonData = files.readJSONFile(filename)
  jsonData.snippets.push({
    id: tools.createNewID(jsonData.snippets),
    language: languageResult.language,
    title: snippetTitleResult.title,
    code
  })

  files.writeJSONFile(jsonData, filename)
  logger.success(`${languageResult.language} Code Snippet added.`)
}

const exportCodebox = async(program) => {
  var languageData = files.readJSONFile(LANGUAGES_PWD)
  var languages = languageData.languages

  if (languages.length === 0) {
    logger.error('No Programming Language yet. See \'codebox --help\'.')
    return
  }

  var languageResult = await inquirer.checkForLanguageExisting(program.language, languages)
  var filename = tools.createCodeSnippetFileName(FOLDER_PWD, languageResult.language)

  if (!fs.existsSync(filename)) {
    logger.error('No Programming Language found. See \'codebox --help\'.')
    return
  }

  var jsonData = files.readJSONFile(filename)
  var mdData = tools.createMDFromJSON(jsonData)
  var mdFilename = tools.createMDFileName(languageResult.language)

  files.writeFile(mdFilename, mdData)
  logger.success(`${languageResult.language} Code Snippets exported.`)
}

const searchCodeSnippets = async(program) => {
  var languageData = files.readJSONFile(LANGUAGES_PWD)

  var keywordResult = await inquirer.checkForKeyword(program.keyword)
  var searchResults = tools.searchCodeSnippet(languageData.languages, keywordResult.keyword)

  logger.success(`${searchResults.length} results found.`)

  if (searchResults != 0) {
    var snippetResult = await inquirer.createChooser(
      'snippet', 
      'Choose Code Spinnet:', 
      Array.from(searchResults, (searchResult, index) => {
        return `${index+1}. ${searchResult.language.toUpperCase()} - ${searchResult.title}`
      })
    )
    
    var resultIndex = tools.getSearchIndex(snippetResult.snippet) 
    clipboardy.writeSync(searchResults[resultIndex].code)
    logger.success('Code Snippet copied to Clipboard.')
  }
}

module.exports = {
  initializeCodebox,
  createProgrammingLanguage,
  createCodeSnippet,
  exportCodebox,
  searchCodeSnippets
}