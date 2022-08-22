import { Request, Response } from 'express';
import { CURRENT_LOT, CURRENT_PRODUCT } from '../config/db';

const lots = CURRENT_LOT;
const product =  CURRENT_PRODUCT;

export class HomeController {
    public async homeIndex(req: Request, res: Response) {
        const userId = res.locals.user.id;
        try {
            const lsPromise = lots.findAll({
                where: {
                    userId
                }
            });

            const productsPromise = product.findAll({
                where: {
                    userId
                },
                order: [
                    ['createdAt', 'ASC']
                ]
            });

            const [products, ls] = await Promise.all([productsPromise, lsPromise]);
            res.render('index', {
                namePage: 'Lotes',
                fecha: '15/09/2020',
                cod_lote: 45644564,
                lots: ls,
                products
            });
        } catch (error) {
            console.error(error);
        } 
    }
}