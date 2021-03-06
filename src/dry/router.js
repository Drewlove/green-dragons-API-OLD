const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const Service = require('./service')

const router = express.Router()
const bodyParser = express.json()


const properties = {
  users: ['first_name', 'last_name', 'birth_date'],
  communities: ['communities_name'],
  sub_communities: ['communities_id', 'sub_communities_name' ],
  users_sub_communities: ['users_id', 'sub_communities_id'],
  challenge_types: ['challenge_types_name', 'challenge_types_description', 'challenge_types_best_record', 'units'],
  users_challenge_instances: ['users_id', 'challenge_types_id', 'entry_date', 'record'],
  users_dragon_bucks: ['users_id', 'dragon_bucks']
}

function formatRawQuery(rawQuery){
  return rawQuery.split('&').join(' ')
    .replace(/ID/g, '??')
    .replace(/VALUE/g, '?')
}

function formatRawBindings(rawBindings){
  return rawBindings
  .replace(/OPEN/gi, '(')
  .replace(/CLOSE/g, ')')
  .split('&')
}

function sanitizeObj(obj){
  let sanitizedObj = {}
  Object.keys(obj).map(key => {
    sanitizedObj[key] = obj[key]
  })
  return sanitizedObj
}

router
.route('/dynamicGet/:rawQuery/:rawBindings')
.get((req, res, next)=> {
  const {rawQuery, rawBindings} = req.params
  const query = formatRawQuery(rawQuery)
  const bindings = formatRawBindings(rawBindings)
  Service.dynamicGet(req.app.get('db'), query, bindings)
  .then(selectObj => {
    const sanitizedRows = selectObj.rows.map(rowObj => {
        return sanitizeObj(rowObj)
      })
      res.json(sanitizedRows)
  })
  .catch(next)
})

router
  .route('/:table')
  .get((req, res, next) => {
    const {table} = req.params
    Service.getAll(req.app.get('db'), table)
    .then(allRows => {
      const sanitizedRows = allRows.map(rowObj => {
        return sanitizeObj(rowObj)
      })
      res.json(sanitizedRows)
    })
    .catch(next)
  })

  router
  .route('/:table/POST')
  .post(bodyParser, (req, res, next) => {
    const {table} = req.params

    let newRow = {}
    Object.keys(req.body).map(key => {
      if(req.body[key] === `${table}_id`){
        return
      } else {
        return newRow[key] = req.body[key]
      }
    })

    for (const field of properties[table]) {
      if (!newRow[field]) {
        logger.error(`Method: POST, Status: Invalid. Error Description: For table: '${table}' '${field}' is required`)
        return res.status(400).send({
          error: { message: `For table: '${table}' '${field}' is required` }
        })
      }
    }

    logger.info(`New row for table ${table}: ${Object.entries(newRow)}`)

    Service.insertRow(
      req.app.get('db'),
      table,
      newRow
    )
      .then(row => {
        logger.info(`Method: POST, Status: Valid, Update: Table '${table}': Row with id '${row.id}' created.`)
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `${row.id}`))
          .json(sanitizeObj(row))

      })
      .catch(next)
  })

router
  .route('/:table/:serviceMethod/:row_id')

  .all((req, res, next) => {
    const {table} = req.params
    const { row_id } = req.params
    Service.getById(req.app.get('db'), table, row_id)
      .then(row => {
        if (!row) {
          logger.error(`Method: ALL, Status: Invalid,
          Error Description: Table '${table}' with id '${row_id}' not found.`)
          return res.status(404).json({
            error: { message: `Table ${table}: Row Not Found` }
          })
        }
        res.row = row
        next()
      })
      .catch(next)
  })

  .get((req, res) => {
    res.json(sanitizeObj(res.row))
  })

  .delete((req, res, next) => {
    const {row_id } = req.params
    const {table} = req.params
    Service.deleteRow(
      req.app.get('db'),
      table,
      row_id
    )
      .then(numRowsAffected => {
        logger.info(`Method: DELETE, Status: Valid,
        Update: Table '${table}': with id '${row_id}' deleted.`)
        res.status(204).end()
      })
      .catch(next)
  })

  .patch(bodyParser, (req, res, next) => {
    const {table} = req.params
    let updatedRow = {}
    Object.keys(req.body).map(key => {
      updatedRow[key] = req.body[key]
      // if(properties[table].indexOf(key) !== -1){
      //   updatedRow[key] = req.body[key]
      // }
    })

    let keysMissingValues = [];
    Object.keys(updatedRow).map(key => {
      if(updatedRow[key] === '' && properties[table].indexOf(key) !== -1){
        keysMissingValues.push(key)
      }
    })


    if (keysMissingValues.length > 0) {
      logger.error(`Method: PATCH, Status: Invalid,
      Error Description: table: '${table}', missing NOT NULL value for: ${keysMissingValues}`)
      return res.status(400).json({
        error: {
          message: `Request body must contain either ${properties[table]}`
        }
      })
    }

    // const error = getBookmarkValidationError(bookmarkToUpdate)

    // if (error) return res.status(400).send(error)

    Service.updateRow(
      req.app.get('db'),
      table,
      req.params.row_id,
      updatedRow
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = router
