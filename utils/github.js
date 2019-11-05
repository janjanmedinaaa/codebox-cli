const Gists = require('gists')
const inquirer = require('inquirer')
const Cryptr = require('cryptr')
const fs = require('fs')

const encryption = require('../encryption.json')
const files = require('./files')

const cryptr = new Cryptr(encryption.key)

const ENCRYPTION_FILE = 'codebox-acc'
const ENCRYPTION_DIR = `${files.getCodeboxDirLocation()}/${ENCRYPTION_FILE}`

module.exports = {
  loginUser: async() => {
    const questions = [
      {
        name: 'username',
        type: 'input',
        message: 'Enter your Github username:'
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your password:'
      }
    ]

    var githubAccount = await inquirer.prompt(questions)
    module.exports.saveAccount(githubAccount)
  },

  saveAccount: (githubAccount) => {
    var account = JSON.stringify(githubAccount)
    const encrypted = cryptr.encrypt(account)

    files.writeFile(ENCRYPTION_DIR, encrypted)
    return module.exports.getAccountDetails()
  },

  checkAccount: () => {
    if (!fs.existsSync(ENCRYPTION_DIR))
      module.exports.loginUser()
    else
      return module.exports.getAccountDetails()
  },

  getAccountDetails: () => {
    var account = files.readFile(ENCRYPTION_DIR)
    return JSON.parse(cryptr.decrypt(account))
  }
}