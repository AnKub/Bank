import {
  GenerateCode,
  generateUniqueID,
} from '../utils/Generators'
import fs = require('fs')
import { Wallet } from './Wallet'

export interface Notification {
  id?: number
  type: NOTIFICATION_TYPE
  message: string
  date: Date
}

export enum NOTIFICATION_TYPE {
  WARNING,
  ANNOUNCEMENT,
}

export class User extends Wallet {
  public isEmailValid = false
  private emailCode: string | null = null
  private passwordCode: string | null = null
  public img: string = ''

  private notifications: Notification[] = []

  constructor(
    public email: string,
    public password: string,
    public username: string,
  ) {
    super()
  }

  generateEmailCode(): string {
    this.emailCode = GenerateCode('1234567890', 4)
    return this.emailCode
  }

  generatePasswordCode(): string {
    this.passwordCode = GenerateCode('1234567890', 4)
    return this.passwordCode
  }

  validEmail(code: string): boolean {
    const isValid = code === this.emailCode
    if (isValid) {
      this.emailCode = null
      this.isEmailValid = true
    }

    return isValid
  }

  updatePassword(password: string) {
    this.password = password
  }

  setImg(imgData: string) {
    this.img = imgData
  }

  addNotification(notification: Notification) {
    notification.id = Number(generateUniqueID())
    this.notifications.unshift(notification)
  }
  getNotifications() {
    return [...this.notifications]
  }

  static getUser(email: string): User | null {
    const user =
      this.list.find(
        (v) => v instanceof User && v.email === email,
      ) || null

    return user instanceof User ? user : null
  }

  static getUserById(id: number): User | null {
    const user = this.list.find((v) => v.id === id) || null
    return user instanceof User ? user : null
  }

  static getUserByCode(code: string): User | null {
    const user =
      this.list.find(
        (v) => v instanceof User && v.passwordCode === code,
      ) || null

    return user instanceof User ? user : null
  }

  static create(
    email: string,
    password: string,
    username: string,
  ): User {
    if (this.getUser(email))
      throw Error(
        'A user with the same name is already exist',
      )

    const user = new User(email, password, username)
    try {
      const image = fs.readFileSync(
        'store/icons/human.svg',
        'base64',
      )
      user.setImg('data:image/svg+xml;base64, ' + image)
    } catch (error) {}
    this.list.push(user)
    return user
  }
}

export default User
