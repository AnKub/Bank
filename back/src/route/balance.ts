import express = require('express')
import { NOTIFICATION_TYPE, User } from '../class/User'
import {
  TRANSACTION_TYPE,
  Transaction,
} from '../class/Transaction'
import { PaymentSystem } from '../class/PaymentSystem'
import { Wallet } from '../class/Wallet'
export const BalanceRouter = express.Router()

BalanceRouter.get('/balance', (req: any, res) => {
  const email = req.email
  if (!email)
    return res.status(400).json({ message: 'error' })

  try {
    const user = User.getUser(email)
    if (!user) throw 'Error'
    res.status(200).json({
      count: user?.cash,
    })
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

BalanceRouter.get('/transactions', (req: any, res) => {
  const email = req.email
  if (!email)
    return res.status(400).json({ message: 'error' })

  try {
    const user = User.getUser(email)
    if (!user) throw 'Error'

    const data = getTransactionsFormat(user)

    res.status(200).json({
      data,
    })
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

BalanceRouter.get('/transaction', (req: any, res) => {
  const email = req.email
  const { id } = req.query

  if (!email || !String(id))
    return res.status(400).json({ message: 'error' })

  try {
    const user = User.getUser(email)
    if (!user) throw 'Email not found'

    const transaction = Transaction.getByID(id)
    if (!transaction) throw 'Transaction not found'
    const data = transactionFormat(transaction, user.id)

    res.status(200).json({
      data,
    })
  } catch (error: any) {
    console.log(error)
    res
      .status(400)
      .json({ message: error.message || 'Error' })
  }
})

BalanceRouter.post('/send', (req: any, res) => {
  const userEmail = req.email
  const { email, sum } = req.body
  try {
    if (!userEmail || !email || !sum) throw 'Not Data'

    if (userEmail === email)
      throw "You can't choose yourself"

    const initUser = User.getUser(userEmail)

    if (!initUser) throw 'Error'

    if (initUser.cash < sum) throw 'Not enough money'

    const targetUser = User.getUser(email)
    if (!targetUser) throw 'User not found'

    initUser.cash -= sum
    targetUser.cash += sum

    const { id } = Transaction.create(
      sum,
      initUser.id,
      targetUser.id,
    )

    const data = { id }

    initUser.addNotification({
      type: NOTIFICATION_TYPE.ANNOUNCEMENT,
      message: 'Send money',
      date: new Date(),
    })
    targetUser.addNotification({
      type: NOTIFICATION_TYPE.ANNOUNCEMENT,
      message: 'Receive money',
      date: new Date(),
    })

    res.status(200).json({
      data,
    })
  } catch (error: any) {
    res.status(400).json({
      message: error.message || error || 'Error',
    })
  }
})

BalanceRouter.post('/receive', (req: any, res) => {
  const userEmail = req.email

  const { system, sum } = req.body
  try {
    if (!userEmail || !sum || !String(system))
      throw 'Not Data'

    const initUser = User.getUser(userEmail)

    if (!initUser) throw 'Error'

    const paymentSystem = PaymentSystem.get(system)
    if (!paymentSystem) throw 'System not found'

    paymentSystem.cash -= sum
    initUser.cash += sum

    const { id } = Transaction.create(
      sum,
      paymentSystem.id,
      initUser.id,
    )

    initUser.addNotification({
      type: NOTIFICATION_TYPE.ANNOUNCEMENT,
      message: 'Receive money',
      date: new Date(),
    })

    const data = { id }
    res.status(200).json({
      data,
    })
  } catch (error: any) {
    res.status(400).json({
      message: error.message || error || 'Error',
    })
  }
})

function getTransactionsFormat(user: User): any[] {
  const transactions = Transaction.getTransactions(user.id)

  const transactionDTO: any[] = []
  transactions.forEach((tran) => {
    const format = transactionFormat(tran, user.id)
    if (!format) return
    transactionDTO.push(format)
  })

  return transactionDTO
}

function transactionFormat(
  transaction: Transaction,
  userID: number,
) {
  const { type, targetID } =
    transaction.from_id === userID
      ? {
          type: TRANSACTION_TYPE.SEND,
          targetID: transaction.to_id,
        }
      : {
          type: TRANSACTION_TYPE.RECIVE,
          targetID: transaction.from_id,
        }

  const wallet = Wallet.getById(targetID)
  if (!wallet) return null

  let username
  let email
  if (wallet instanceof User) {
    username = wallet.username
    email = wallet.email
  } else {
    username = wallet.name
  }
  return {
    id: transaction.id,
    type,
    email: email,
    amount: transaction.amount,
    date: transaction.date,
    username: username,
    img: wallet.img,
  }
}
