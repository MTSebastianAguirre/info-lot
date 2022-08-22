import { BuildOptions, Model } from 'sequelize';

export interface CurrentProductAttributes {
    id?: number;
    code: string;
    name: string;
    link: string;
    userId?: any;
}

export interface CurrentProductModel extends Model<CurrentProductAttributes>, CurrentProductAttributes {};

export class CurrentProduct extends Model<CurrentProductModel, CurrentProductAttributes> {};

export type CurrentProductStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CurrentProductModel;
};