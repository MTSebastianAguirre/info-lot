import passport from 'passport';
import passport_local from 'passport-local'
import bcrypt from 'bcrypt-nodejs';
import { CURRENT_USER } from './db';

const LocalStrategy = passport_local.Strategy;

// Referencia al model para autenticar
const Users: any = CURRENT_USER;

// local strategy
passport.use(
    new LocalStrategy(
        // por defecto passport espera un usuario y pass
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                console.log(email, password);
                const userDone: any = await Users.findOne({
                    where: {email}
                });
                // Usuario existe, password incorrecto
                if (!bcrypt.compareSync(password, userDone.password)) {
                    return done(null, false, {
                        message: 'Contraseña incorrecta'
                    });
                }
                // Email y contraseña correctas
                return done(null, userDone);
            } catch (error) {
                return done(null, false, {
                    message: 'El usuario no existe'
                })
            }
        }
    )
);

// Serializar
passport.serializeUser((user, callback) => {
    callback(null, user)
});

// Deserliazar
passport.deserializeUser((user, callback) => {
    callback(null, user)
});

export default passport;