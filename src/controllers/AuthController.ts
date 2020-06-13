import jsonwebtoken from 'jsonwebtoken'
import User from '../schemas/User'
import { Request, Response } from 'express'
import 'dotenv/config'

class AuthController {
  public async authenticated (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const erros = []

    if (!email || email === null) {
      erros.push({ message: 'Email field is required' })
    }
    if (!password || email === password) {
      erros.push({ message: 'Password field is required' })
    }

    if (erros.length > 0) {
      return res.json({ status: false, errors: erros })
    }

    await User.findOne({ email: email }, (err, doc) => {
      if (err) {
        return res.json({ status: false, error: err })
      }
      if (doc) {
        const token = jsonwebtoken.sign({ id: doc._id }, process.env.JWT_SECRET, { expiresIn: 86400 })
        return res.json({ status: true, message: 'Authenticaded', token: token })
      }
      res.json({ status: false, message: 'Unauthorized' })
    })
  }
}

export default AuthController
