import { Request, Response } from 'express';
import { TipoUsuario } from '../interfaces/Usuario.interface';
import UsuarioRepository from '../Repositories/UsuarioRepository';
import Retorno from '../Utils/Retorno';

const Admin = async (req: Request, res: Response, next: () => void) => {
    const idUser = req.body.userId as number;
    const user = await UsuarioRepository.readById(idUser);
    if (user.tipoUsuario === TipoUsuario.ADMIN) {
        return next();
    }
    return res.json(Retorno.Sucesso(false, [], 'Esse usuário não tem acesso'));
};

export default Admin;
