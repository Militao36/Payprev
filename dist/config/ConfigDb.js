"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
exports.default = knex_1.default({
    client: 'mysql',
    connection: {
        host: 'mysql669.umbler.com',
        user: 'buiatchaka',
        password: 'buiatchaka2vezes',
        database: 'payprev',
    },
});
//# sourceMappingURL=ConfigDb.js.map