import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document {
  email: string
  firstname: string
  lastname: string
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default model<UserInterface>('User', UserSchema)
