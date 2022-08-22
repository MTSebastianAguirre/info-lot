"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserFactory = void 0;
var sequelize_1 = require("sequelize");
var bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
function CurrentUserFactory(sequelize) {
    var userReturn = sequelize.define('user', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING(60),
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Agrega un Email válido'
                },
                notEmpty: {
                    msg: 'El Email no puede ir vacio'
                }
            },
            unique: {
                name: '',
                msg: 'El usuario esta registrado'
            }
        },
        password: {
            type: sequelize_1.DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El campo no puede estar vacio'
                }
            }
        },
        token: sequelize_1.DataTypes.STRING,
        expiration: sequelize_1.DataTypes.DATE
    }, {
        hooks: {
            beforeCreate: function (user) {
                user.password = bcrypt_nodejs_1.default.hashSync(user.password, bcrypt_nodejs_1.default.genSaltSync(10));
            }
        }
    });
    return userReturn;
}
exports.CurrentUserFactory = CurrentUserFactory;
