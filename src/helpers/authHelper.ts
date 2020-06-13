import jsonwebtoken, { VerifyErrors } from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'
import 'dotenv/config'

class AuthHelper {
  static jwtTokenVerify (req: Request, res: Response, next: NextFunction): Response {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const parts = authorization.split(' ')

    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Token error' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/.test(scheme)) {
      return res.status(401).json({ error: 'Token malformatted' })
    }

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err: VerifyErrors) => {
      if (err) {
        return res.status(401).json({ status: false, error: 'Token invalid', message: err.message })
      }
      return next()
    })
  }
}

export default AuthHelper
