import { Request, Response } from 'express'
import { Session } from '../class/Session'

interface CustomRequest extends Request {
  email?: string
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: any,
) => {
  if (req.method === 'OPTIONS') return next()

  const token = req.headers.authorization
  if (!token)
    return res
      .status(401)
      .json({ message: 'Not authorization' })

  const session = Session.findSession(token)

  if (!session)
    return res
      .status(401)
      .json({ message: 'Not authorization' })

  req.email = session.email

  next()
}
