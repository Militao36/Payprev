import { TipoUsuario } from '../enum/TipoUsuario';

export interface Usuario {
    idUser?: number;
    email: string;
    senha: string;
    cpf: string;
    tipoUsuario: TipoUsuario;
}
