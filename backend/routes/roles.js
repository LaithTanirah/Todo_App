const express = require('express')

const roleRouter = express.Router()

const { createRole } = require('../controllers/roles')

roleRouter.post('/createRole', createRole)


module.exports = roleRouter