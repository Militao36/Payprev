"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// Routes
const UsuarioAdmin_routes_1 = __importDefault(require("./UsuarioAdmin.routes"));
const UsuarioComum_routes_1 = __importDefault(require("./UsuarioComum.routes"));
router.use(UsuarioAdmin_routes_1.default);
router.use(UsuarioComum_routes_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map