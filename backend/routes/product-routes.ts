const expressProduct = require('express');
const expressProductsRouter = expressProduct.Router();
const productController = require('../controllers/product-controller');
const { validatePermissionJWT } = require('../middlewares/validate-middleware');

expressProductsRouter.get('/:id', productController.getProduct);

expressProductsRouter.post('', validatePermissionJWT, productController.addProduct);
expressProductsRouter.patch('/:id', validatePermissionJWT, productController.updateProduct);
expressProductsRouter.delete('/:id', validatePermissionJWT, productController.deleteProduct);

module.exports = expressProductsRouter;
