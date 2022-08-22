import { BuildOptions, Model } from 'sequelize';

export interface CurrentUserAttributes {
    id?: number;
    email?: string;
    password?: string;
    token?: string;
    expiration?: Date | string | number;
}

export interface CurrentUserModel extends Model<CurrentUserAttributes>, CurrentUserAttributes {};

export class CurrentUser extends Model<CurrentUserModel, CurrentUserAttributes> {};

export type CurrentUserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CurrentUserModel;
};