"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const middlewares_1 = require("../middlewares");
const auth_dto_1 = require("./auth.dto");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.AuthController();
        router.post("/login", (0, middlewares_1.validateDTO)(auth_dto_1.LoginUserDTO), controller.loginUser);
        router.post("/register", (0, middlewares_1.validateDTO)(auth_dto_1.RegisterUserDTO), controller.registerUser);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
