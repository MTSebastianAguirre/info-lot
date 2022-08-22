"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
var db_1 = require("../config/db");
var product = db_1.CURRENT_PRODUCT;
var lot = db_1.CURRENT_LOT;
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.prototype.createProductView = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, productsPromise, lotsPromise, _a, products, lots, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = res.locals.user.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        productsPromise = product.findAll({
                            where: {
                                userId: userId
                            }
                        });
                        lotsPromise = lot.findAll({
                            where: {
                                userId: userId
                            }
                        });
                        return [4 /*yield*/, Promise.all([productsPromise, lotsPromise])];
                    case 2:
                        _a = _b.sent(), products = _a[0], lots = _a[1];
                        res.render('newProduct', {
                            namePage: 'Nuevo Producto',
                            products: products,
                            lots: lots
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.createProductDB = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, code, name, link, errors, productsPromise, lotsPromise, _b, products, lots, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        userId = res.locals.user.id;
                        _a = req.body, code = _a.code, name = _a.name, link = _a.link;
                        errors = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        productsPromise = product.findAll({
                            where: {
                                userId: userId
                            }
                        });
                        lotsPromise = lot.findAll({
                            where: {
                                userId: userId
                            }
                        });
                        return [4 /*yield*/, Promise.all([productsPromise, lotsPromise])];
                    case 2:
                        _b = _c.sent(), products = _b[0], lots = _b[1];
                        if (!code.trim().length)
                            errors.push({ text: 'Debe ingresar un codigo' });
                        if (!name.trim().length)
                            errors.push({ text: 'Debe ingresar un nombre' });
                        if (!link.trim().length)
                            errors.push({ text: 'Debe ingresar un link' });
                        if (!(errors.length > 1)) return [3 /*break*/, 3];
                        res.render('newProduct', {
                            namePage: 'Nuevo Producto',
                            products: products,
                            lots: lots,
                            errors: errors
                        });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, product.create({
                            code: code,
                            name: name,
                            link: link,
                            userId: userId
                        })];
                    case 4:
                        _c.sent();
                        res.redirect('/');
                        _c.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _c.sent();
                        console.error(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.editProductView = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userId, productsPromise, lotsPromise, productPromise, _a, products, lots, sProduct, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        userId = res.locals.user.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        productsPromise = product.findAll({
                            where: {
                                userId: userId
                            }
                        });
                        lotsPromise = lot.findAll({
                            where: {
                                userId: userId
                            }
                        });
                        productPromise = product.findOne({
                            where: {
                                id: id
                            }
                        });
                        return [4 /*yield*/, Promise.all([productsPromise, lotsPromise, productPromise])];
                    case 2:
                        _a = _b.sent(), products = _a[0], lots = _a[1], sProduct = _a[2];
                        if (!sProduct) {
                            return [2 /*return*/, next()];
                        }
                        res.render('newProduct', {
                            namePage: 'Producto',
                            product: sProduct,
                            products: products,
                            lots: lots
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        console.error(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.editProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, code, name, link, userId, sProduct, productoSave, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, code = _a.code, name = _a.name, link = _a.link;
                        userId = res.locals.user.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, product.findOne({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        sProduct = _b.sent();
                        sProduct.code = code;
                        sProduct.name = name;
                        sProduct.link = link;
                        return [4 /*yield*/, sProduct.save()];
                    case 3:
                        productoSave = _b.sent();
                        if (!productoSave) {
                            return [2 /*return*/, next()];
                        }
                        else {
                            res.redirect('/');
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _b.sent();
                        console.error(error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ProductController;
}());
exports.ProductController = ProductController;
