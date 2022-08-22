import { DataTypes, Sequelize } from 'sequelize';
import { CurrentLotStatic } from '../types/Lot.type';
import { CurrentProductFactory } from './Product';
import { CurrentUserFactory } from './User';

export function CurrentLotFactory(sequelize: Sequelize): CurrentLotStatic {
    const LOT = <CurrentLotStatic>sequelize.define('lot', {
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
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El campo no puede estar vacio'
                }
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'El campo cantidad no puede estar vacio'
                }
            }
        }
    });
    LOT.belongsTo(CurrentUserFactory(sequelize));
    LOT.belongsTo(CurrentProductFactory(sequelize));

    return LOT;
}