import { DataTypes, Sequelize } from 'sequelize';
import { CurrentProductStatic } from '../types/Product.type';
import { CurrentUserFactory } from './User';

export function CurrentProductFactory(sequelize: Sequelize): CurrentProductStatic {

    const productReturn = <CurrentProductStatic>sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El campo no puede estar vacio'
                }
            }
        },
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El campo no puede estar vacio'
                }
            }
        },
        link: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El campo no puede estar vacio'
                }
            }
        },
    })

    productReturn.belongsTo(CurrentUserFactory(sequelize));

    return productReturn
}
