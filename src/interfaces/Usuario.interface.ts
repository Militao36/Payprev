export interface Usuario {
    idUser?: number;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario: TipoUsuario;
}

export enum TipoUsuario {
    ADMIN = 1,
    COMUM = 2,
}
