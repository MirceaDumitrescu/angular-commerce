import mongoose from 'mongoose';
import { UserSchema } from './userSchema';
import { ProductSchema } from './productSchema';

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toUTCString(),
  },
});

export const OrderSchema = mongoose.model('orders', orderSchema);
