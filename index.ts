import Server from './classes/server'
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index';
import { SERVER_PORT } from './global/environment';
import path from 'path';
import express from 'express';
import session from 'express-session';
import cookie from 'cookie-parser';
import flash from 'connect-flash';
import passport from './config/passport';
// Helpers
import * as helpers from './helpers';
// base de datos
import { db } from './config/db';

const server = Server.instance;
// Llamar lo modelos

// Habilitar pug
server.app.set('view engine', 'pug');

// Añadir la carpeta de las vistas
server.app.set('views', path.join(__dirname, './views'));

// Body Parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({origin: true, credentials: true}));

// Cargar archivos estaticos
server.app.use(express.static(__dirname + '/public'));

// agrega flash messages
server.app.use(flash());

// Congigurar cookies
server.app.use(cookie());

// sessiones nos permiter navegar entre paginas sin volver a autenicar
server.app.use(session({
    secret: 'secretosuper',
    resave: false,
    saveUninitialized: false
}));

server.app.use(passport.initialize());
server.app.use(passport.session());

// Pasar var dump a la app
server.app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.message = req.flash();
    res.locals.user = {...(req as any).user} || null;

    next();
});

// Rutas
server.app.use('/', routes());

server.app.use((req, res, next) => {
    res.status(404).send('La ruta a la cual quiere acceder no existe');
});

// Iniciar conexion base de datos
server.start(() => {
    console.log(`Servidor listo en el puerto: ${SERVER_PORT}`);
    // db.authenticate().then(resp => {
    //     console.log('OK');
    //     console.log(resp);
    // }).catch((err) => {
    //     console.log('error');
    //     console.error(err);
    // });
    db.sync()
        .then(() => {
            console.log('Conectado con el server')
        })
        .catch((err) => {
            console.error(err);
            console.log('Error al conectar con el server')
        })
});
