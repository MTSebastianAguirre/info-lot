import { Sequelize } from 'sequelize';
import { CurrentLotFactory } from '../models/Lot';
import { CurrentProductFactory } from '../models/Product';
import { CurrentUserFactory } from '../models/User';

export const db = new Sequelize('iagqkkgm', 'iagqkkgm', 'Wh4DtUVG6AhUkPvLv5PNE01S-zHFFL_k', {
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
export const CURRENT_LOT = CurrentLotFactory(db);
// Tabla Productos
export const CURRENT_PRODUCT = CurrentProductFactory(db);
// Tabla usuarios
export const CURRENT_USER = CurrentUserFactory(db);
