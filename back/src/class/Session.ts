import { GenerateCode } from '../utils/Generators'

export class Session {
  constructor(public code: string, public email: string) {}
  public static sessions: Session[] = []

  static add(email: string): Session {
    const code = GenerateCode('qwertyuiopQWERTYUIOP', 10)
    const session = new Session(code, email)
    setTimeout(() => {
      this.removeSession(code)
    }, 600000)
    this.sessions.push(session)
    return session
  }
  static findSession(token: string) {
    return (
      this.sessions.find((v) => v.code === token) || null
    )
  }

  static removeSession(code: string) {
    this.sessions = this.sessions.filter(
      (value) => value.code !== code,
    )
  }

  static check(code: string, email: string): Boolean {
    return this.sessions.some(
      (value) =>
        value.code === code && value.email === email,
    )
  }
}
