"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/login", (req, res) => {
            res.json("Login");
        });
        router.use("/register", (req, res) => {
            res.json("Register");
        });
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
