import { Request, Response } from 'express';
import UsuarioRepository from '../Repositories/UsuarioRepository';
import Retorno from '../Utils/Retorno';
import { TipoUsuario } from '../enum/TipoUsuario';

const Admin = async (req: Request, res: Response, next: () => void) => {
    const idUser = req.body.userId as number;
    const user = await UsuarioRepository.readById(idUser);
    if (user.length === 0) {
        return res.status(403)
            .json(Retorno.Sucesso(false, [], 'O usuário passado no token, não foi encontrada na base de dados'));
    }
    if (user[0].tipoUsuario === TipoUsuario.ADMIN) {
        return next();
    }
    return res.status(403).json(Retorno.Sucesso(false, [], 'Esse usuário não tem acesso'));
};

export default Admin;
