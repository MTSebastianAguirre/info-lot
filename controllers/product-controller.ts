import { Request, Response, NextFunction } from "express";
import { CURRENT_LOT, CURRENT_PRODUCT } from '../config/db';

const product =  CURRENT_PRODUCT;
const lot = CURRENT_LOT;

export class ProductController {
    public async createProductView(req: Request, res: Response) {
        const userId = res.locals.user.id;
        try {
            const productsPromise = product.findAll({
                where: {
                    userId
                }
            });
            const lotsPromise = lot.findAll({
                where: {
                    userId
                }
            });
            const [products, lots] = await Promise.all([productsPromise, lotsPromise]);
            res.render('newProduct', {
                namePage: 'Nuevo Producto',
                products,
                lots
            });
        } catch (error) {
            console.error(error);
        }
    }

    public async createProductDB(req: Request, res: Response) {
        const userId = res.locals.user.id;
        const {code, name, link} = req.body;
        let errors: {text: string}[] = [];
        try {
            const productsPromise = product.findAll({
                where: {
                    userId
                }
            });
            const lotsPromise = lot.findAll({
                where: {
                    userId
                }
            });
            const [products, lots] = await Promise.all([productsPromise, lotsPromise]);

            if (!code.trim().length) errors.push({text: 'Debe ingresar un codigo'});
            if (!name.trim().length) errors.push({text: 'Debe ingresar un nombre'});
            if (!link.trim().length) errors.push({text: 'Debe ingresar un link'});

            if (errors.length > 1) {
                res.render('newProduct', {
                    namePage: 'Nuevo Producto',
                    products,
                    lots,
                    errors
                });
            } else {
                await product.create({
                    code,
                    name,
                    link,
                    userId
                });
                res.redirect('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    public async editProductView(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const userId = res.locals.user.id;
        try {
            const productsPromise = product.findAll({
                where: {
                    userId
                }
            });
            const lotsPromise = lot.findAll({
                where: {
                    userId
                }
            });

            const productPromise = product.findOne({
                where: {
                    id
                }
            });
            const [products, lots, sProduct] = await Promise.all([productsPromise, lotsPromise, productPromise]);

            if (!sProduct) {
                return next();
            }

            res.render('newProduct', {
                namePage: 'Producto',
                product: sProduct,
                products,
                lots
            });
        } catch (error) {
            console.error(error);
        }
    }

    public async editProduct(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const {code, name, link} = req.body;
        const userId = res.locals.user.id;
        try {
            const sProduct = await product.findOne({
                where: {
                    id
                }
            });
            
            (sProduct as any).code = code;
            (sProduct as any).name = name;
            (sProduct as any).link = link;
            
            const productoSave = await (sProduct as any).save();

            if (!productoSave) {
                return next();
            } else {
                res.redirect('/');
            }
        } catch (error) {
            console.error(error);
        }
    }
}