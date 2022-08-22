import { BuildOptions, Model } from 'sequelize';

export interface CurrentLotAttributes {
    id?: number;
    code: string;
    date: Date | string | number;
    quantity: number;
    userId?: any;
    productId?: any;
}

export interface CurrentLotModel extends Model<CurrentLotAttributes>, CurrentLotAttributes {};

export class CurrentLot extends Model<CurrentLotModel, CurrentLotAttributes> {};

export type CurrentLotStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CurrentLotModel;
};