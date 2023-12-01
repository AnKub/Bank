import express = require('express')
import { AuthRouter } from './auth'
import { BalanceRouter } from './balance'
import { authMiddleware } from '../middleware/authMiddleware'
import { UserRouter } from './user'

export const router = express.Router()

router.use(AuthRouter)
router.use(authMiddleware, BalanceRouter)
router.use(authMiddleware, UserRouter)
