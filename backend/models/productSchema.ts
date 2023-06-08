import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    min: 3,
    max: 26,
  },
  categories: {
    type: [String],
  },
  sku: {
    type: String,
    min: 2,
    max: 15,
  },
  stock: {
    type: Number,
  },
  price: {
    type: Number,
  },
  long_description: {
    type: String,
  },
  short_description: {
    type: String,
  },
  images: {
    type: [String],
  },
  thumbnail: {
    type: String,
  },
  supplier: {
    type: String,
  },
  weight: {
    type: Number,
  },
  dimensions: {
    type: String,
  },
  date: {
    type: String,
    default: new Date().toUTCString(),
  },
});

export const ProductSchema = mongoose.model('products', productSchema);
