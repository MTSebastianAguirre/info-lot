import { Request, Response, NextFunction } from 'express';

export class AuthController {
    public usuarioAutenticado(req: Request, res: Response, next: NextFunction) {
        if ((req as any).isAuthenticated()) {
            return next();
        }

        return res.redirect('/log-in');
    }
}