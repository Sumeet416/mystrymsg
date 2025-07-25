import mongoose, {Schema, Document} from "mongoose";
import { Content } from "next/font/google";

export interface Message extends Document{
  content: String;
  createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

export interface User extends Document{
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true,'Username is required...'],
    trim: true,
    unique: true
  },

  email:{
    type: String,
    required: [true, 'Email is required...'],
    unique: true,
    match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'please use a valid email address...']
  },

  password:{
    type: String,
    required: [true,'Password is required...']
  },

  verifyCode:{
    type: String,
    required: [true,'VerifyCode is required...']
  },

  verifyCodeExpiry:{
    type: Date,
    required: [true,'VerifyCodeExpiry is required...']
  },

 isVerified: {
  type: Boolean,
  default: false
 },

 isAcceptingMessage: {
  type: Boolean,
  default: true
 },

 messages:[MessageSchema]

})

const UserModal = (mongoose.models.User as mongoose.Model<User>)
export default UserModal