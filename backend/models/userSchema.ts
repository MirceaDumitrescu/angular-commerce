import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    min: 6,
    max: 26,
  },
  firstname: {
    type: String,
    min: 2,
    max: 15,
  },
  lastname: {
    type: String,
    min: 2,
    max: 15,
  },
  password: {
    type: String,
    min: 6,
    max: 18,
  },
  age: {
    type: Number,
    min: 16,
    max: 70,
  },
  sex: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  creation_date: {
    type: String,
    default: new Date().toUTCString(),
  },
  total_spent: {
    type: Number,
    default: 0,
  },
  last_login: {
    type: String,
  },
  last_ip: {
    type: String,
  },
});

export const UserSchema = mongoose.model('users', userSchema);
