var test = require('ava')

var configureDatabase = require('./helpers/database-config')
configureDatabase(test)

var db = require('../../server/db')

test('getAllData returns array with at least id, date and mood', t => {
  return db.getAllData(t.context.connection)
    .then(function(result) {
      t.not(result.data[0].date, undefined)
      t.not(result.data[0].id, undefined)
      t.not(result.data[0].outlook, undefined)
      t.not(result.data[0].energy, undefined)
    })
})

test('getAll returns a different array depending on tableName', t => {
  return db.getAll(t.context.connection, 'entry')
    .then((entryResults) => {
      return db.getAll(t.context.connection, 'variable')
        .then((variableResults) => {
          t.not(entryResults[0].id, variableResults[0].id)
        })
    })
})

test('addVariable adds a new variable to the variable table', t => {
  return db.addVariable(t.context.connection, "I'm new!")
    .then(() => {
      return db.getAll(t.context.connection, 'variable')
        .then((variables) => {
          t.is(variables[variables.length-1].name, "I'm new!")
        })
    })
})

test('addEntry adds a entry to the variable table', t => {
  let entry = {
    
  }
  return db.addEntry(t.context.connection, entry)
})
