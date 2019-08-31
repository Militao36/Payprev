"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Retorno {
    Sucesso(sucesso, body, mensagem) {
        return {
            Sucesso: sucesso,
            Body: body,
            Mensagem: mensagem,
        };
    }
}
exports.default = new Retorno();
//# sourceMappingURL=Retorno.js.map