#!/usr/bin/env node 

const program = require('./utils/commander')()
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