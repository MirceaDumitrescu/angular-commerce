import IUser from './IUser';
import IProdcuts from './IProducts';

export default interface IOrder {
  _id: string;
  products: IProdcuts[];
  user: IUser;
  status: OrderStatusType;
  paymentType: PaymentType;
  total: number;
  subTotal: number;
  date: Date;
}

export type OrderStatusType = 'Proccesing' | 'Accepted' | 'Delivered' | 'Canceled';
export type PaymentType = 'Delivery' | 'Bank' | 'Card';
