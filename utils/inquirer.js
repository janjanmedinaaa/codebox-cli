const inquirer = require('inquirer');

module.exports = {
  checkForLanguageExisting: (language, choices) => {
    if (language != undefined) return { language }

    return module.exports.createChooser(
      'language',
      'Enter Programming Language:',
      Array.from(choices, x => x.language)
    )
  },

  checkForLanguageNew: (language) => {
    if (language != undefined) return { language }

    const questions = [
      {
        name: 'language',
        message: 'Enter New Programming Language:'
      },
    ]
    return inquirer.prompt(questions)
  },

  checkForCodeSnippetTitle: (title) => {
    if (title != undefined) return { title }

    const questions = [
      {
        name: 'title',
        message: 'Enter Code Snippet Title:'
      },
    ]
    return inquirer.prompt(questions)
  },

  checkForKeyword: (keyword) => {
    if (keyword != undefined) return { keyword }

    const questions = [
      {
        name: 'keyword',
        message: 'Enter keyword to search:'
      },
    ]
    return inquirer.prompt(questions)
  },

  createChooser: (name, message, choices) => {
    const questions = [
      {
        name,
        type: 'list',
        message,
        choices
      },
    ]
    return inquirer.prompt(questions)
  }
}