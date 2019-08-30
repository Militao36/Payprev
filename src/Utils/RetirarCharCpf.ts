export default (cpf: string) => {
    return cpf
        .replace('.', '')
        .replace('.', '')
        .replace('-', '');
};
