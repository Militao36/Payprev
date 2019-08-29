import { Request, Response } from 'express';
import UsuarioRepository from '../Repositories/UsuarioRepository';
import Retorno from '../Utils/Retorno';
import generetaToken from '../Utils/GenerateToken';

class UsuarioController {
    public async login(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body;

        const user = await UsuarioRepository.readByEmail(email);

        if (user.length === 0) {
            return res
                .status(401)
                .json(Retorno.Sucesso(false, [], 'Usuario não encontrado/Não autorizado'));
        }

        if (user[0].senha !== senha) {
            return res
                .status(401)
                .json(Retorno.Sucesso(false, [], 'Senha invalida'));
        }
        user[0].senha = '*******';
        res.status(201).json(Retorno.Sucesso(true, [{ ...user[0], token: generetaToken(user[0].idUser) }], 'Login efetuado com sucesso'));
    }

    public async cadastrar(req: Request, res: Response): Promise<Response> {
        try {
            const { email, senha, cpf, tipoUsuario } = req.body;
            const user = await UsuarioRepository.save({ email, senha, cpf, tipoUsuario });
            res
                .status(201)
                .json(Retorno.Sucesso(true, [...user], 'Usuario cadastrado com sucesso'));
        } catch (error) {
            return res
                .status(400)
                .json(Retorno.Sucesso(false, [], 'Erro ao realizar cadastro'));
        }
    }

    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const { email, senha, cpf, tipoUsuario } = req.body;
            await UsuarioRepository.update({ idUser: parseInt(req.params.id, null), email, senha, cpf, tipoUsuario });
            res
                .status(201)
                .json(Retorno.Sucesso(true, [], 'Usuario cadastrado com sucesso'));
        } catch (error) {
            return res
                .status(400)
                .json(Retorno.Sucesso(false, [], 'Erro ao realizar atualização'));
        }
    }
}

export default new UsuarioController();
