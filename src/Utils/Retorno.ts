class Retorno {
    public Sucesso(sucesso: boolean, body: object, mensagem: string): object {
        return {
            Sucesso: sucesso,
            Body: body,
            Mensagem: mensagem,
        };
    }
}

export default new Retorno();
