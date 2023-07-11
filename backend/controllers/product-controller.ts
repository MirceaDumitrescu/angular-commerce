import { Request, Response } from 'express';
import { ProductSchema } from '../models/productSchema';
import mongoose from 'mongoose';
import IProdcuts from '../interfaces/IProducts';
import { sendResponse } from './utility-controller';

const addProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  try {
    if (!productData) throw new Error('Request has no body data!');

    const productExists = await ProductSchema.findOne({
      sku: productData.sku,
    });

    if (productExists) throw new Error('Product already exists!');

    const product = new ProductSchema({
      _id: new mongoose.Types.ObjectId(),
      ...productData,
    });

    await product.save();

    return sendResponse(res, 201, { statusText: 'Success', message: 'Created product succesfully!' });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request', message: `${error}` });
  }
};

const getProduct = async (req: Request, res: Response) => {
  const productID = req.params.id;

  try {
    if (!productID) throw new Error('Request has no ID parameter!');

    const productData = await ProductSchema.findOne({ _id: productID });
    if (!productData) throw new Error('No product data associated with the ID');

    return sendResponse(res, 200, { statusText: 'Ok', message: 'Got product data!' });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request', message: `${error}` });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  const productID = req.params.id;
  const newUserData = req.body;
  const updateObject: IProdcuts = {};
  Object.keys(newUserData).forEach((key: string) => {
    updateObject[key as keyof IProdcuts] = newUserData[key];
  });

  try {
    if (!productID) throw new Error('Request has no ID parameter!');

    if (!newUserData || Object.keys(newUserData).length < 1) throw new Error('Request has no body data!');

    const updateResult = await ProductSchema.updateOne({ _id: productID }, { $set: updateObject });
    if (!updateResult.acknowledged) throw new Error('Update failed!');

    return sendResponse(res, 200, { statusText: 'Ok!', message: 'Product data updated!' });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request', message: `${error}` });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  const productID = req.params.id;

  try {
    if (!productID) throw new Error('Request has no ID parameter!');

    await ProductSchema.deleteOne({ _id: productID });

    return sendResponse(res, 200, { statusText: 'Ok!', message: 'Product deleted succesfully!' });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request', message: `${error}` });
  }
};

module.exports = { addProduct, getProduct, updateProduct, deleteProduct };
