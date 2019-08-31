"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Secret_1 = __importDefault(require("../config/Secret"));
function generetaToken(user) {
    return jsonwebtoken_1.default.sign({ id: user }, Secret_1.default.secret, {
        expiresIn: 86400,
    });
}
exports.default = generetaToken;
//# sourceMappingURL=GenerateToken.js.map