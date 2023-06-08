const expressOrder = require('express');
const expressOrderRouter = expressOrder.Router();
const orderController = require('../controllers/order-controller');

expressOrderRouter.post('', orderController.createOrder);
expressOrderRouter.get('/:id', orderController.getOrderData);
expressOrderRouter.patch('/:id', orderController.updateOrder);
expressOrderRouter.delete('/:id', orderController.deleteOrder);

module.exports = expressOrderRouter;
