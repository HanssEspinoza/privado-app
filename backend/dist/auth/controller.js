"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const prisma = new client_1.PrismaClient();
const JWT_SECRET = config_1.envs.JWT_SECRET || "your_jwt_secret";
class AuthController {
    constructor() {
        this.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password, name, role } = req.body;
            try {
                const existingUser = yield prisma.user.findUnique({
                    where: { email },
                });
                if (existingUser) {
                    res.status(400).json({ error: "El usuario ya existe" });
                    return;
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield prisma.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        name,
                        role,
                    },
                });
                res
                    .status(201)
                    .json({ message: "Usuario registrado exitosamente", user: newUser });
            }
            catch (error) {
                res.status(500).json({ error: "Error en el registro del usuario" });
            }
        });
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield prisma.user.findUnique({
                    where: { email },
                });
                if (!user) {
                    res.status(400).json({ error: "Usuario o contraseña incorrectos" });
                    return;
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    res.status(400).json({ error: "Usuario o contraseña incorrectos" });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
                    expiresIn: "1h",
                });
                res.json({ message: "Inicio de sesión exitoso", token });
            }
            catch (error) {
                res.status(500).json({ error: "Error en el inicio de sesión" });
            }
        });
    }
}
exports.AuthController = AuthController;
