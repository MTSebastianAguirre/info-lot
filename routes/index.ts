import express from 'express';
import { LotController } from '../controllers/lot-controller';
import { HomeController } from '../controllers/home-controller';
import { AuthController } from '../controllers/auth-controller';
import { UserController } from '../controllers/user-controller';
import { ProductController } from '../controllers/product-controller';
import { body } from 'express-validator/check';


const routes = express.Router();

// Controladores
const lotController = new LotController();
const productController = new ProductController();
const homeController = new HomeController();
const authController = new AuthController();
const userController = new UserController();

export default () => {
    routes.get('/',
        authController.usuarioAutenticado,
        homeController.homeIndex
    );

    // Vista inicio sesion
    routes.get('/log-in',
        userController.formLogIn
    );
    // Login
    routes.post('/log-in',
        userController.authenticateUser
    );

    // Crear cuenta vista
    routes.get('/create-account',
        userController.createAccount
    );

    // Crear cuenta
    routes.post('/create-account',
        userController.createAccountDB
    );

    // Crear producto vista
    routes.get('/new-product',
        authController.usuarioAutenticado,
        productController.createProductView
    );
    
    // Crear Producto DB
    routes.post('/new-product',
        authController.usuarioAutenticado,
        productController.createProductDB
    );

    // Crearlote vista
    routes.get('/new-lot',
        authController.usuarioAutenticado,
        lotController.createLotView  
    );

    // Crearlote DB
    routes.post('/new-lot',
        authController.usuarioAutenticado,
        lotController.createLotDB 
    );

    // Servicio REST consultar lote y producto
    routes.get('/lot',
        lotController.serviceRestQueryLot
    );

    // Editar Producto View
    routes.get('/products/:id',
        authController.usuarioAutenticado,
        productController.editProductView
    );

    // Editar Producto
    routes.post('/new-product/:id',
        authController.usuarioAutenticado,
        productController.editProduct
    );

    return routes;
}