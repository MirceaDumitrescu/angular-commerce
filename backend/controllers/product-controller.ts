import { Request, Response } from 'express';
import { ProductSchema } from '../models/productSchema';
import mongoose from 'mongoose';
import IProdcuts from '../interfaces/IProducts';

const postProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  if (!productData) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no body data!',
    });
  }
  if (
    !productData.title ||
    !productData.categories ||
    !productData.sku ||
    !productData.stock ||
    !productData.price ||
    !productData.long_description ||
    !productData.short_description ||
    !productData.images ||
    !productData.thumbnail ||
    !productData.supplier ||
    !productData.weight ||
    !productData.dimensions
  ) {
    return res.status(412).json({
      status: 'Precondition failed',
      msg: 'Product data is missing fields!',
    });
  }
  const productExists = await ProductSchema.findOne({
    sku: productData.sku,
  });

  if (productExists) {
    return res.status(409).json({
      status: 'Conflict',
      msg: 'Product already exists!',
    });
  }
  const product = new ProductSchema({
    _id: new mongoose.Types.ObjectId(),
    ...productData,
  });
  try {
    await product.save();
    res.status(201).json({
      status: 'Success',
      msg: 'Created product succesfully!',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Request failed ',
      msg: `${error}`,
    });
  }
};
const getProduct = async (req: Request, res: Response) => {
  const productID = req.params.id;
  if (!productID) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no ID parameter!',
    });
  }
  try {
    const productData = await ProductSchema.findOne({ _id: productID });
    if (!productData) {
      return res.status(404).json({
        status: 'Not found!',
        msg: `No product data associated with the ID`,
      });
    }
    return res.status(200).json({
      status: 'Success',
      msg: 'Got product data!',
      data: productData,
    });
  } catch (error) {
    res.status(412).json({
      status: `Wrong ID format provided`,
      msg: `${error}`,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  const productID = req.params.id;
  const newUserData = req.body;
  const updateObject: IProdcuts = {};
  Object.keys(newUserData).forEach((key: string) => {
    updateObject[key as keyof IProdcuts] = newUserData[key];
  });
  if (!productID) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no ID parameter!',
    });
  }
  if (!newUserData || Object.keys(newUserData).length < 1) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no body data!',
    });
  }
  try {
    const updateResult = await ProductSchema.updateOne({ _id: productID }, { $set: updateObject });
    if (!updateResult.acknowledged) {
      return res.status(404).json({
        status: 'Failed',
        msg: 'Update failed!',
      });
    }
    return res.status(200).json({
      status: 'Success',
      msg: 'Product data updated!',
    });
  } catch (error) {
    res.status(400).json({
      status: `Error encountered`,
      msg: `${error}`,
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  const productID = req.params.id;
  if (!productID) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no ID parameter!',
    });
  }
  try {
    await ProductSchema.deleteOne({ _id: productID });
    return res.status(200).json({
      status: 'Success',
      msg: 'Product deleted succesfully!',
    });
  } catch (error) {
    res.status(400).json({
      status: `Error encountered`,
      msg: `${error}`,
    });
  }
};

module.exports = { postProduct, getProduct, updateProduct, deleteProduct };
