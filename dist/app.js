"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = __importDefault(require("./routes/routes"));
class App {
    constructor() {
        this.express = express_1.default();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
        this.express.use(compression_1.default());
    }
    routes() {
        this.express.use(routes_1.default);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map