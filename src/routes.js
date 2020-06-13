import { Router } from 'express'
import UserController from './controllers/UseController'
import AuthController from './controllers/AuthController'
import AuthHelper from './helpers/authHelper'

const router = Router()

// user
router.get('/user', AuthHelper.jwtTokenVerify, UserController.listAll)
router.post('/user', AuthHelper.jwtTokenVerify, UserController.create)
router.delete('/user/:id', AuthHelper.jwtTokenVerify, UserController.delete)
router.put('/user/:id', AuthHelper.jwtTokenVerify, UserController.update)

// auth
router.post('/authenticated', new AuthController().authenticated)

export default router
