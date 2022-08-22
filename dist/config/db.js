"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURRENT_USER = exports.CURRENT_PRODUCT = exports.CURRENT_LOT = exports.db = void 0;
var sequelize_1 = require("sequelize");
var Lot_1 = require("../models/Lot");
var Product_1 = require("../models/Product");
var User_1 = require("../models/User");
exports.db = new sequelize_1.Sequelize('iagqkkgm', 'iagqkkgm', 'Wh4DtUVG6AhUkPvLv5PNE01S-zHFFL_k', {
    host: 'motty.db.elephantsql.com',
    dialect: 'postgres',
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000
    },
    port: 5432
});
// Tabla de lotes
exports.CURRENT_LOT = Lot_1.CurrentLotFactory(exports.db);
// Tabla Productos
exports.CURRENT_PRODUCT = Product_1.CurrentProductFactory(exports.db);
// Tabla usuarios
exports.CURRENT_USER = User_1.CurrentUserFactory(exports.db);
