import { config } from 'dotenv'

import express = require('express')
import { router } from './route'

export const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE',
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  )
  next()
})
app.use(express.json())

app.use('/', router)
