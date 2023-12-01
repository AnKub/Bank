import express = require('express')
import { NOTIFICATION_TYPE, User } from '../class/User'
import { Session } from '../class/Session'

export const UserRouter = express.Router()

UserRouter.post('/change-email', (req: any, res) => {
  const emailOld = req.email
  const { email, password } = req.body
  if (!emailOld || !email || !password)
    return res
      .status(400)
      .json({ message: 'Data not found' })

  try {
    const user = User.getUser(emailOld)
    if (!user) throw 'User not found'

    if (user.password !== password)
      throw 'Password incorrect'
    user.email = email
    const session = Session.add(user.email)

    user.addNotification({
      type: NOTIFICATION_TYPE.WARNING,
      message: 'Change email',
      date: new Date(),
    })
    res.status(200).json({
      token: session.code,
      user: {
        email: user.email,
        isConfirm: user.isEmailValid,
      },
    })
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

UserRouter.post('/change-password', (req: any, res) => {
  const email = req.email
  console.log(req.body)
  const { newPassword, oldPassword } = req.body
  if (!newPassword || !email || !oldPassword)
    return res
      .status(400)
      .json({ message: 'Data not found' })

  try {
    const user = User.getUser(email)
    if (!user) throw 'User not found'

    if (user.password !== oldPassword)
      throw 'Password incorrect'
    user.password = newPassword
    const session = Session.add(user.email)
    user.addNotification({
      type: NOTIFICATION_TYPE.WARNING,
      message: 'Change password',
      date: new Date(),
    })
    res.status(200).json({
      token: session.code,
      user: {
        email: user.email,
        isConfirm: user.isEmailValid,
      },
    })
  } catch (error: any) {
    console.log(error)
    res
      .status(400)
      .json({ message: error.message || error })
  }
})

UserRouter.get('/notifications', (req: any, res) => {
  const email = req.email

  if (!email)
    return res
      .status(400)
      .json({ message: 'Data not found' })

  try {
    const user = User.getUser(email)
    if (!user) throw 'User not found'

    const data = user.getNotifications()

    res.status(200).json({
      data,
    })
  } catch (error: any) {
    console.log(error)
    res
      .status(400)
      .json({ message: error.message || error })
  }
})
