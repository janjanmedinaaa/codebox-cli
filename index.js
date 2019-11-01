#!/usr/bin/env node 

const program = require('./utils/commander')()
const actions = require('./actions')

if (program.init)
  actions.initializeCodebox()
else if (program.new)
  actions.createProgrammingLanguage(program)
else if (program.snip)
  actions.createCodeSnippet(program)
else if (program.export)
  actions.exportCodebox(program)
else if (program.find)
  actions.searchCodeSnippets(program)