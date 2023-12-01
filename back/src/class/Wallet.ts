import { PaymentSystem } from './PaymentSystem'
import { User } from './User'

export class Wallet {
  public static list: Array<User | PaymentSystem> = []
  public cash: number = 0
  public static id = 0
  public id = 0
  constructor() {
    this.id = Wallet.id++
  }

  static getById(id: number) {
    return this.list.find((v) => v.id === id)
  }
}
