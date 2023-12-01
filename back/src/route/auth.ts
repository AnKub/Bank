import express = require('express')
import { NOTIFICATION_TYPE, User } from '../class/User'
import { Session } from '../class/Session'
import { Transaction } from '../class/Transaction'
import fs = require('fs')
import { PaymentSystem } from '../class/PaymentSystem'
import { Wallet } from '../class/Wallet'
export const AuthRouter = express.Router()

AuthRouter.post('/signin', (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    res
      .status(400)
      .json({ message: 'Email or password not found' })

  try {
    const user = User.getUser(email)
    if (!user || user.password !== password)
      throw { message: 'Email or password incorrect' }

    const session = Session.add(user.email)
    const { isEmailValid: isConfirm } = user

    user.addNotification({
      type: NOTIFICATION_TYPE.ANNOUNCEMENT,
      message: 'Login',
      date: new Date(),
    })
    res.status(200).json({
      token: session.code,
      user: { email, isConfirm },
    })
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

AuthRouter.post('/signup', (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    res
      .status(400)
      .json({ message: 'Email or password not found' })

  try {
    const user = User.create(
      email,
      password,
      'TestUsername',
    )
    if (!user) throw { message: 'error' }
    const session = Session.add(user.email)

    const { isEmailValid: isConfirm } = user

    console.log(user.generateEmailCode())
    res.status(200).json({
      token: session.code,
      user: { email, isConfirm },
    })
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

AuthRouter.post('/signup-confirm', (req, res) => {
  const { email, code } = req.body
  if (!email || !code)
    res
      .status(400)
      .json({ message: 'Email or password not found' })

  try {
    const user = User.getUser(email)
    if (!user) throw { message: 'Code error' }

    const isValid = user.validEmail(code)
    if (!isValid) throw { message: 'Code error' }
    const { isEmailValid: isConfirm } = user

    user.addNotification({
      type: NOTIFICATION_TYPE.ANNOUNCEMENT,
      message: 'Login',
      date: new Date(),
    })
    res.status(200).json({ user: { email, isConfirm } })
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

AuthRouter.post('/recovery', (req, res) => {
  const { email } = req.body
  if (!email)
    res
      .status(400)
      .json({ message: 'Email or password not found' })

  try {
    const user = User.getUser(email)
    if (!user) throw { message: 'Email error' }

    console.log(user.generatePasswordCode())

    res.status(200).json({})
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})
AuthRouter.post('/recovery-confirm', (req, res) => {
  const { code, password } = req.body
  if (!code || !password)
    res
      .status(400)
      .json({ message: 'Email or password not found' })

  try {
    const user = User.getUserByCode(code)
    if (!user) throw { message: 'Code error' }
    user.password = password
    user.addNotification({
      type: NOTIFICATION_TYPE.WARNING,
      message: 'Restore email',
      date: new Date(),
    })
    res.status(200).json({})
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})
