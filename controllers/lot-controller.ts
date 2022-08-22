import { Request, Response } from "express";
import { getOnlyDate } from '../utils/utils';
import { CURRENT_LOT, CURRENT_PRODUCT } from '../config/db';

const lotModel = CURRENT_LOT;
const productModel = CURRENT_PRODUCT;

export class LotController {
    public async serviceRestQueryLot(req: Request, res: Response) {
        // const { l, d, p } = req.query;
        const l = req.query.l || '';
        const d = req.query.d || '';
        const p = req.query.p || '';
        try {
            console.log({ l, d, p });
            
            if (p) {
            // if (l && d && p) {
                
                const lotPromise = lotModel.findOne({
                    where: {
                        code: l,
                        // date: {
                        //     [Op.gte]: (d as string)
                        // }
                    }
                });

                const productPromise = productModel.findOne({
                    where: {
                        code: p
                    }
                });

                const [lot, product] = await Promise.all([lotPromise, productPromise]);

                if (lot) {
                    (lot as any).sDate = getOnlyDate((lot as any).date);
                    console.log(getOnlyDate((lot as any).date));
                }

                // res.render('home', {
                //     lot,
                //     product,
                //     namePage: product ? (product as any).name : 'Info',
                //     l
                // });
                res.status(201).json({
                    ok: true,
                    lot,
                    product,
                    namePage: product ? (product as any).name : 'Info',
                    l,
                });
            } else {
                res.status(201).json({
                    ok: true
                });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false
            })
        }
    }

    public async createLotView(req: Request, res: Response) {
        const userId = res.locals.user.id;
        try {
            const productsPromise = productModel.findAll({
                where: {
                    userId
                }
            });
            const lotsPromise = lotModel.findAll({
                where: {
                    userId
                }
            });
            const [products, lots] = await Promise.all([productsPromise, lotsPromise]);
            res.render('newLot', {
                namePage: 'Nuevo Lote',
                products,
                lots
            });
        } catch (error) {
            console.error(error);
        };
    }

    public async createLotDB(req: Request, res: Response) {
        const userId = res.locals.user.id;
        const {code, date, quantity, product} = req.body;
        let errors: {text: string}[] = [];
        try {
            console.log({code, date, quantity, product});
            const productsPromise = productModel.findAll({
                where: {
                    userId
                }
            });
            const lotsPromise = lotModel.findAll({
                where: {
                    userId
                }
            });
            const [products, lots] = await Promise.all([productsPromise, lotsPromise]);

            if (!code.trim().length) errors.push({text: 'Debe ingresar un codigo'});
            if (!date.trim().length) errors.push({text: 'Debe ingresar un nombre'});
            if (Number(quantity) < 0) errors.push({text: 'Debe ingresar una cantidad valida'});
            if (!product) errors.push({text: 'Debe seleccionar un producto'});

            if (errors.length > 0) {
                res.render('newLot', {
                    namePage: 'Nuevo Producto',
                    products,
                    lots,
                    errors
                });
            } else {
                await lotModel.create({ code, date: new Date(date), quantity, productId: Number(product), userId})
                res.redirect('/');
            }

        } catch (error) {
            console.error(error);
        }
    }
}