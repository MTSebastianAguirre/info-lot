"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.usuarioAutenticado = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/log-in');
    };
    return AuthController;
}());
exports.AuthController = AuthController;
