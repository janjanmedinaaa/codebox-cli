#!/usr/bin/env node 

const program = require('./utils/commander')()
const github = require('./utils/github')
const actions = require('./actions')

if (program.init)
  actions.initializeCodebox()
  
if (program.new)
  actions.createProgrammingLanguage(program)

if (program.snip)
  actions.createCodeSnippet(program)

if (program.export)
  actions.exportCodebox(program)

if (program.find)
  actions.searchCodeSnippets(program)

if (program.update)
  actions.updateCodeSnippets(program)

if (program.all)
  actions.getAllCodeSnippets(program)

if (program.delete)
  actions.deleteCodeSnippets(program)

if (program.login)
  github.checkAccount()