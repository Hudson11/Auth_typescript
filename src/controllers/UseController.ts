import { Response, Request } from 'express'
import User from '../schemas/User'

class UserController {
  public async listAll (req: Request, res: Response): Promise<Response> {
    const users = await User.find()
    return res.json(users)
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { body } = req
    if (!body) {
      return res.status(400).send('Nâo há dados na requisição')
    }
    const user = await User.create(req.body)
    return res.json(user)
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { body } = req
    const { id } = req.params
    if (!body) {
      return res.status(400).send('Não há dados na requisição')
    }
    if (!id) {
      return res.status(400).send('Id não encontrado')
    }
    const user = await User.updateOne({ _id: id }, req.body)
    return res.json(user)
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    if (!id) {
      return res.status(400).send('Id não encontrado')
    }
    const user = await User.deleteOne({ _id: id })
    return res.json(user)
  }
}

export default new UserController()
