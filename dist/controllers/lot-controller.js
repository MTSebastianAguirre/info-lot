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
exports.LotController = void 0;
var utils_1 = require("../utils/utils");
var db_1 = require("../config/db");
var lotModel = db_1.CURRENT_LOT;
var productModel = db_1.CURRENT_PRODUCT;
var LotController = /** @class */ (function () {
    function LotController() {
    }
    LotController.prototype.serviceRestQueryLot = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var l, d, p, lotPromise, productPromise, _a, lot, product, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        l = req.query.l || '';
                        d = req.query.d || '';
                        p = req.query.p || '';
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        console.log({ l: l, d: d, p: p });
                        if (!p) return [3 /*break*/, 3];
                        lotPromise = lotModel.findOne({
                            where: {
                                code: l,
                            }
                        });
                        productPromise = productModel.findOne({
                            where: {
                                code: p
                            }
                        });
                        return [4 /*yield*/, Promise.all([lotPromise, productPromise])];
                    case 2:
                        _a = _b.sent(), lot = _a[0], product = _a[1];
                        if (lot) {
                            lot.sDate = utils_1.getOnlyDate(lot.date);
                            console.log(utils_1.getOnlyDate(lot.date));
                        }
                        // res.render('home', {
                        //     lot,
                        //     product,
                        //     namePage: product ? (product as any).name : 'Info',
                        //     l
                        // });
                        res.status(201).json({
                            ok: true,
                            lot: lot,
                            product: product,
                            namePage: product ? product.name : 'Info',
                            l: l,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(201).json({
                            ok: true
                        });
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        console.log(error_1);
                        res.status(500).json({
                            ok: false
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LotController.prototype.createLotView = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, productsPromise, lotsPromise, _a, products, lots, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = res.locals.user.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        productsPromise = productModel.findAll({
                            where: {
                                userId: userId
                            }
                        });
                        lotsPromise = lotModel.findAll({
                            where: {
                                userId: userId
                            }
                        });
                        return [4 /*yield*/, Promise.all([productsPromise, lotsPromise])];
                    case 2:
                        _a = _b.sent(), products = _a[0], lots = _a[1];
                        res.render('newLot', {
                            namePage: 'Nuevo Lote',
                            products: products,
                            lots: lots
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        console.error(error_2);
                        return [3 /*break*/, 4];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    LotController.prototype.createLotDB = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, code, date, quantity, product, errors, productsPromise, lotsPromise, _b, products, lots, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        userId = res.locals.user.id;
                        _a = req.body, code = _a.code, date = _a.date, quantity = _a.quantity, product = _a.product;
                        errors = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        console.log({ code: code, date: date, quantity: quantity, product: product });
                        productsPromise = productModel.findAll({
                            where: {
                                userId: userId
                            }
                        });
                        lotsPromise = lotModel.findAll({
                            where: {
                                userId: userId
                            }
                        });
                        return [4 /*yield*/, Promise.all([productsPromise, lotsPromise])];
                    case 2:
                        _b = _c.sent(), products = _b[0], lots = _b[1];
                        if (!code.trim().length)
                            errors.push({ text: 'Debe ingresar un codigo' });
                        if (!date.trim().length)
                            errors.push({ text: 'Debe ingresar un nombre' });
                        if (Number(quantity) < 0)
                            errors.push({ text: 'Debe ingresar una cantidad valida' });
                        if (!product)
                            errors.push({ text: 'Debe seleccionar un producto' });
                        if (!(errors.length > 0)) return [3 /*break*/, 3];
                        res.render('newLot', {
                            namePage: 'Nuevo Producto',
                            products: products,
                            lots: lots,
                            errors: errors
                        });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, lotModel.create({ code: code, date: new Date(date), quantity: quantity, productId: Number(product), userId: userId })];
                    case 4:
                        _c.sent();
                        res.redirect('/');
                        _c.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _c.sent();
                        console.error(error_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return LotController;
}());
exports.LotController = LotController;
