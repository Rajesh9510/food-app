const express = require('express')
const { testController } = require('../controllers/testController')

const routes=express.Router()

//rouete GET POST UPDATE DELETE 
routes.get("/test-user",testController)

module.exports = routes