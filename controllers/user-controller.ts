import { Request, Response } from "express";
import passport from 'passport';
import { CURRENT_USER } from "../config/db";

const user = CURRENT_USER;

export class UserController {

    public authenticateUser = passport.authenticate('local', ({
        successRedirect: '/',
        failureRedirect: '/log-in',
        failureFlash: true,
        badRequestMessage: 'Ambos campos son obligatorios'
    } as any))

    public formLogIn(req: Request, res: Response) {
        const { error } = res.locals.message;

        res.render('logIn', {
            namePage: 'Iniciar Sesión',
            error
        });
    }

    public createAccount(req: Request, res: Response) {
        const { error } = res.locals.message;

        console.log(error);

        res.render('createAccount', {
            namePage: 'Crear Cuenta',
            error    
        });
    }

    public async createAccountDB(req: Request, res: Response) {
        // Leer los datos
        const {email, password} = req.body;
        try {
            console.log({email, password});

            await user.create({
                email,
                password
            });

            req.flash('success', 'Se ha creado su cuenta exitosamente');
            
            res.redirect('/log-in');
        } catch (error) {
            
            res.render('createAccount', {
                nombrePagina: 'Crear Cuenta en Uptask',
                message: req.flash('error', 'Ocurrió un error al tratar de crear la cuenta'),
                email,
                password
            });
        }
    }

    // public authenticateUser(req: Request, res: Response) {
    //     console.log(req.body);
    // }

}