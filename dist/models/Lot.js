"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentLotFactory = void 0;
var sequelize_1 = require("sequelize");
var Product_1 = require("./Product");
var User_1 = require("./User");
function CurrentLotFactory(sequelize) {
    var LOT = sequelize.define('lot', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: sequelize_1.DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El campo no puede estar vacio'
                }
            }
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El campo no puede estar vacio'
                }
            }
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'El campo cantidad no puede estar vacio'
                }
            }
        }
    });
    LOT.belongsTo(User_1.CurrentUserFactory(sequelize));
    LOT.belongsTo(Product_1.CurrentProductFactory(sequelize));
    return LOT;
}
exports.CurrentLotFactory = CurrentLotFactory;
