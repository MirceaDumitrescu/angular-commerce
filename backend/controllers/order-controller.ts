import { Request, Response } from 'express';
import { OrderSchema } from '../models/orderSchema';
import mongoose from 'mongoose';
import IOrder from '../interfaces/IOrder';

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  if (!orderData) {
    res.status(404).json({
      success: 'Order data not found',
    });
  }
  orderData._id = new mongoose.Types.ObjectId();
  const order = new OrderSchema(orderData);
  try {
    await order.save();
    res.status(200).json({
      success: 'Great creation',
      data: orderData,
    });
  } catch (error) {
    res.status(400).json({
      success: 'Bad request',
      error: error,
    });
  }
};

const getOrderData = async (req: Request, res: Response) => {
  const orderID = req.params.id;
  const order = await OrderSchema.findById(orderID);
  res.status(200).json({
    success: 'Great get data',
    data: order,
  });
};

const updateOrder = async (req: Request, res: Response) => {
  const orderID = req.params.id;
  const newOrderData = req.body;
  const updateObject: Partial<IOrder> = {};
  Object.keys(newOrderData).forEach((key: string) => {
    updateObject[key as keyof IOrder] = newOrderData[key];
  });
  if (!orderID) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no ID parameter!',
    });
  }
  if (!newOrderData || Object.keys(newOrderData).length < 1) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no body data!',
    });
  }
  const orderData = await OrderSchema.findOne({ _id: orderID });
  if (!orderData) {
    return res.status(404).json({
      status: 'Not found!',
      msg: `No Order data associated with the ID`,
    });
  }
  try {
    const updateResult = await OrderSchema.updateOne({ _id: orderID }, { $set: updateObject });
    if (!updateResult.acknowledged) {
      return res.status(404).json({
        status: 'Failed',
        msg: 'Update failed!',
      });
    }
    return res.status(200).json({
      status: 'Success',
      msg: 'Order data updated!',
    });
  } catch (error) {
    res.status(400).json({
      status: `Error encountered`,
      msg: `${error}`,
    });
  }
};
const deleteOrder = async (req: Request, res: Response) => {
  const orderID = req.params.id;
  const deleteOrder = await OrderSchema.findByIdAndDelete(orderID);
  res.status(200).json({
    success: 'Great delete',
    data: deleteOrder,
  });
};

module.exports = { createOrder, getOrderData, updateOrder, deleteOrder };
