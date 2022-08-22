"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentProductFactory = void 0;
var sequelize_1 = require("sequelize");
var User_1 = require("./User");
function CurrentProductFactory(sequelize) {
    var productReturn = sequelize.define('product', {
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
        name: {
            type: sequelize_1.DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El campo no puede estar vacio'
                }
            }
        },
        link: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El campo no puede estar vacio'
                }
            }
        },
    });
    productReturn.belongsTo(User_1.CurrentUserFactory(sequelize));
    return productReturn;
}
exports.CurrentProductFactory = CurrentProductFactory;
