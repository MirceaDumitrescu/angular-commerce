import { Request, Response } from 'express';
import { OrderSchema } from '../models/orderSchema';
import mongoose from 'mongoose';
import IOrder from '../interfaces/IOrder';
import { sendResponse } from './utility-controller';

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  try {
    if (!orderData) throw new Error(`Order data not found`);

    orderData._id = new mongoose.Types.ObjectId();
    const order = new OrderSchema(orderData);
    await order.save();

    return sendResponse(res, 201, { statusText: 'Created', message: 'Created order succesfully!', data: orderData });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request!', message: `${error}` });
  }
};

const getOrderData = async (req: Request, res: Response) => {
  const orderID = req.params.id;
  try {
    if (!orderID) throw new Error('Request has no ID parameter!');

    const order = await OrderSchema.findById(orderID);
    return sendResponse(res, 200, { statusText: 'Ok', message: 'Got order data', data: order });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request', message: `${error}` });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  const orderID = req.params.id;
  const newOrderData = req.body;
  const updateObject: Partial<IOrder> = {};
  Object.keys(newOrderData).forEach((key: string) => {
    updateObject[key as keyof IOrder] = newOrderData[key];
  });
  try {
    if (!orderID) throw new Error('Request has no ID parameter!');
    if (!newOrderData || Object.keys(newOrderData).length < 1) throw new Error('Request has no body data!');

    const orderData = await OrderSchema.findOne({ _id: orderID });
    if (!orderData) throw new Error(`No Order data associated with the ID`);

    const updateResult = await OrderSchema.updateOne({ _id: orderID }, { $set: updateObject });
    if (!updateResult.acknowledged) throw new Error(`'Update failed!`);

    return sendResponse(res, 200, { statusText: 'Success', message: 'Order data updated!' });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request', message: `${error}` });
  }
};
const deleteOrder = async (req: Request, res: Response) => {
  const orderID = req.params.id;
  try {
    await OrderSchema.findByIdAndDelete(orderID);
    return sendResponse(res, 200, { statusText: 'Success', message: 'Deleted an order entry' });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request', message: `${error}` });
  }
};

module.exports = { createOrder, getOrderData, updateOrder, deleteOrder };
