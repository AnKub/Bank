import { app } from './app'

import { createServer } from 'http'
import { PaymentSystem } from './class/PaymentSystem'

import fs = require('fs')
import { Session } from './class/Session'

const server = createServer(app)

server.listen(4000)
server.on('listening', onListening)

function onListening() {
  const addr = server.address()
  if (typeof addr !== 'string' && typeof addr !== null)
    console.log(
      'Listening on ' + 'http://localhost:' + addr?.port,
    )
}

const init_payment_systems = () => {
  const s1 = PaymentSystem.create('Stripe')
  try {
    const image = fs.readFileSync(
      'store/icons/logo-S.svg',
      'base64',
    )
    s1.setImg('data:image/svg+xml;base64, ' + image)
  } catch (error) {}

  s1.cash = Infinity
  const s2 = PaymentSystem.create('Stripe')
  s2.cash = Infinity

  try {
    const image = fs.readFileSync(
      'store/icons/logo-C.svg',
      'base64',
    )
    s2.setImg('data:image/svg+xml;base64, ' + image)
  } catch (error) {}
}

init_payment_systems()
