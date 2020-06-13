import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'

// routers
import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.database()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(cors())
    this.express.use(express.json())
    this.express.use(morgan('dev'))
  }

  private database (): void {
    mongoose.connect('mongodb://localhost:27017/nodets', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log('Conectado ao MongoDb')
    }).catch((err) => {
      console.log(err)
    })
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
