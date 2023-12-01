import { Wallet } from './Wallet'

export class PaymentSystem extends Wallet {
  public img: string = ''

  constructor(public name: string) {
    super()
  }

  setImg(imgData: string) {
    this.img = imgData
  }

  static get(id: number) {
    return this.list.find((v) => v.id === id) || null
  }

  static create(name: string): PaymentSystem {
    const system = new PaymentSystem(name)
    this.list.push(system)
    return system
  }
}
