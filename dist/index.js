"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var index_1 = __importDefault(require("./routes/index"));
var environment_1 = require("./global/environment");
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var connect_flash_1 = __importDefault(require("connect-flash"));
var passport_1 = __importDefault(require("./config/passport"));
// Helpers
var helpers = __importStar(require("./helpers"));
// base de datos
var db_1 = require("./config/db");
var server = server_1.default.instance;
// Llamar lo modelos
// Habilitar pug
server.app.set('view engine', 'pug');
// Añadir la carpeta de las vistas
server.app.set('views', path_1.default.join(__dirname, './views'));
// Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Cargar archivos estaticos
server.app.use(express_1.default.static(__dirname + '/public'));
// agrega flash messages
server.app.use(connect_flash_1.default());
// Congigurar cookies
server.app.use(cookie_parser_1.default());
// sessiones nos permiter navegar entre paginas sin volver a autenicar
server.app.use(express_session_1.default({
    secret: 'secretosuper',
    resave: false,
    saveUninitialized: false
}));
server.app.use(passport_1.default.initialize());
server.app.use(passport_1.default.session());
// Pasar var dump a la app
server.app.use(function (req, res, next) {
    res.locals.vardump = helpers.vardump;
    res.locals.message = req.flash();
    res.locals.user = __assign({}, req.user) || null;
    next();
});
// Rutas
server.app.use('/', index_1.default());
server.app.use(function (req, res, next) {
    res.status(404).send('La ruta a la cual quiere acceder no existe');
});
// Iniciar conexion base de datos
server.start(function () {
    console.log("Servidor listo en el puerto: " + environment_1.SERVER_PORT);
    // db.authenticate().then(resp => {
    //     console.log('OK');
    //     console.log(resp);
    // }).catch((err) => {
    //     console.log('error');
    //     console.error(err);
    // });
    db_1.db.sync()
        .then(function () {
        console.log('Conectado con el server');
    })
        .catch(function (err) {
        console.error(err);
        console.log('Error al conectar con el server');
    });
});
