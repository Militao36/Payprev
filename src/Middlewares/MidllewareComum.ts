import { Request, Response } from 'express';
import { TipoUsuario } from '../enum/TipoUsuario';
import UsuarioRepository from '../Repositories/UsuarioRepository';
import Retorno from '../Utils/Retorno';

const Comum = async (req: Request, res: Response, next: () => void) => {
    const idUser = req.body.userId as number;
    const user = await UsuarioRepository.readById(idUser);
    if (user[0].tipoUsuario === TipoUsuario.COMUM) {
        return next();
    }
    return res.status(403).json(Retorno.Sucesso(false, [], 'Esse usuário não tem acesso'));
};

export default Comum;
