const expressProduct = require('express');
const expressProductsRouter = expressProduct.Router();
const productController = require('../controllers/product-controller');

expressProductsRouter.get('/:id', productController.getProduct);
expressProductsRouter.post('', productController.postProduct);
expressProductsRouter.patch('/:id', productController.updateProduct);
expressProductsRouter.delete('/:id', productController.deleteProduct);

module.exports = expressProductsRouter;
