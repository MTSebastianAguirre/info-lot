import { DataTypes, Sequelize } from 'sequelize';
import { CurrentUserStatic } from '../types/User.type';
import bcrypt from 'bcrypt-nodejs';

export function CurrentUserFactory(sequelize: Sequelize): CurrentUserStatic {
    const userReturn = <CurrentUserStatic>sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(60),
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
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El campo no puede estar vacio'
                }
            }
        },
        token: DataTypes.STRING,
        expiration: DataTypes.DATE
    }, {
        hooks: {
            beforeCreate(user: any) {
                user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
            }
        }
    });

    return userReturn;
}