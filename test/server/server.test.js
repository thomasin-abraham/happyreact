import test from 'ava'
import request from 'supertest'

import app from '../../server/server'

let configureDatabase = require('./helpers/database-config')
configureDatabase(test, app)

test.serial.cb('POST /add-variable adds a variable', t => {
  request(t.context.app)
    .post('/add-variable')
    .send({
      variableName: 'Im a variable'
    })
    .expect(201)
    .then(() => {
      return t.context.connection('variable').select()
    })
    .then((res) => {
          t.is(res[res.length-1].name, 'Im a variable')
          t.end()
    })
})

test.cb('GET /getData returns data', t => {
  request(t.context.app)
    .get('/getData')
    .expect(200)
    .end((err, res) => {
      let keys = Object.keys(res.body.data[0])
      res.body.variableList.forEach((variable) => {
        t.is(keys.includes(variable), true)
      })
      t.is(keys.includes("id"), true)
      t.is(keys.includes("date"), true)
      t.is(keys.includes("energy"), true)
      t.is(keys.includes("outlook"), true)
      t.end()
    })
})

test.cb('GET /getAll of entries returns entries', t => {
  request(t.context.app)
    .get('/getAll')
    .query({ tableName: 'entry' })
    .expect(200)
    .end((err, res) => {
      t.is(res.body[8].title, "Hack me")
      t.ifError(err)
      t.end()
    })
})

test.cb('GET /getAll of bad query returns error', t => {
  request(t.context.app)
    .get('/getAll')
    .query({ tableName: 'test' })
    .expect(401)
    .end((err, res) => {
      t.is(res.status, 401)
      t.end()
    })
})

test.cb('GET /getAll of variables returns variables', t => {
  request(t.context.app)
    .get('/getAll')
    .query({ tableName: 'variable' })
    .expect(200)
    .end((err, res) => {
      t.is(res.body[4].name, "On period")
      t.end()
    })
})

test.cb('POST /add-entry adds a entry', t => {
  request(t.context.app)
    .post('/add-entry')
    .send({
      title: 'Im a entry',
      text: 'Test',
      mood_id: 55,
      variables: [{
        id: 2,
        value: '10'
      }]
    })
    .expect(201)
    .then(() => {
      return t.context.connection('entry').select()
    })
    .then((entry) => {
      t.is(entry[entry.length-1].title, 'Im a entry')
      return t.context.connection('entry_variable').select()
    })
    .then((variable) => {
      t.is(variable[variable.length-1].value, 10)
      t.end()
    })
})
