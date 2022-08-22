"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var lot_controller_1 = require("../controllers/lot-controller");
var home_controller_1 = require("../controllers/home-controller");
var auth_controller_1 = require("../controllers/auth-controller");
var user_controller_1 = require("../controllers/user-controller");
var product_controller_1 = require("../controllers/product-controller");
var routes = express_1.default.Router();
// Controladores
var lotController = new lot_controller_1.LotController();
var productController = new product_controller_1.ProductController();
var homeController = new home_controller_1.HomeController();
var authController = new auth_controller_1.AuthController();
var userController = new user_controller_1.UserController();
exports.default = (function () {
    routes.get('/', authController.usuarioAutenticado, homeController.homeIndex);
    // Vista inicio sesion
    routes.get('/log-in', userController.formLogIn);
    // Login
    routes.post('/log-in', userController.authenticateUser);
    // Crear cuenta vista
    routes.get('/create-account', userController.createAccount);
    // Crear cuenta
    routes.post('/create-account', userController.createAccountDB);
    // Crear producto vista
    routes.get('/new-product', authController.usuarioAutenticado, productController.createProductView);
    // Crear Producto DB
    routes.post('/new-product', authController.usuarioAutenticado, productController.createProductDB);
    // Crearlote vista
    routes.get('/new-lot', authController.usuarioAutenticado, lotController.createLotView);
    // Crearlote DB
    routes.post('/new-lot', authController.usuarioAutenticado, lotController.createLotDB);
    // Servicio REST consultar lote y producto
    routes.get('/lot', lotController.serviceRestQueryLot);
    // Editar Producto View
    routes.get('/products/:id', authController.usuarioAutenticado, productController.editProductView);
    // Editar Producto
    routes.post('/new-product/:id', authController.usuarioAutenticado, productController.editProduct);
    return routes;
});
