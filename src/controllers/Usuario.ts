import { Request, Response } from 'express';
import UsuarioRepository from '../Repositories/UsuarioRepository';
import Retorno from '../Utils/Retorno';
import generetaToken from '../Utils/GenerateToken';
import { isNumber } from 'util';

// TODO ainda falta eu validar a funcao atualizar pois, só validei o começo
// TODO é também falta validar o cpf para que fica apenas com numeros sem caracteres

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
            return res.status(401)
                .json(Retorno.Sucesso(false, [], 'Senha invalida'));
        }
        user[0].senha = '*******';
        res.status(201).json(Retorno.Sucesso(true, [{ ...user[0], token: generetaToken(user[0].idUser) }], 'Login efetuado com sucesso'));
    }

    public async cadastrar(req: Request, res: Response): Promise<Response> {
        try {
            const { email, senha, cpf, tipoUsuario } = req.body;
            const body = { email, senha, cpf, tipoUsuario };
            const validacoes = await UsuarioRepository.validacoes(body);
            if (validacoes.length > 0) {
                res.status(400)
                    .json(Retorno.Sucesso(true, [...validacoes], 'O cadastro não passou em algumas validações'));
            }
            const user = await UsuarioRepository.save(body);
            res.status(201)
                .json(Retorno.Sucesso(true, [...user], 'Usuario cadastrado com sucesso'));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [], 'Erro ao realizar cadastro'));
        }
    }

    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const { email, senha, cpf, tipoUsuario } = req.body;
            if (isNumber(req.params.id)) {
                return res.status(400).json(Retorno.Sucesso(false, [], 'Parametro passando não e um numero valido'));
            }
            await UsuarioRepository.update({ idUser: parseInt(req.params.id, null), email, senha, cpf, tipoUsuario });
            res.status(201)
                .json(Retorno.Sucesso(true, [], 'Usuario atualizado com sucesso'));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [], 'Erro ao realizar atualização'));
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            if (isNumber(req.params.id)) {
                return res.status(400).json(Retorno.Sucesso(false, [], 'Parametro passando não e um numero valido'));
            }
            await UsuarioRepository.delete(parseInt(req.params.id, null));
            return res.status(200)
                .json(Retorno.Sucesso(true, [], 'Registro deletado com sucesso'));
        } catch (error) {
            return res
                .status(400)
                .json(Retorno.Sucesso(false, [], 'Erro ao deletar cadastro de usuario'));
        }
    }

    public async readById(req: Request, res: Response): Promise<Response> {
        try {
            if (isNumber(req.params.id)) {
                return res.status(400).json(Retorno.Sucesso(false, [], 'Parametro passando não e um numero valido'));
            }
            const user = await UsuarioRepository.readById(parseInt(req.params.id, null));
            return res.status(200)
                .json(Retorno.Sucesso(true, [...user], ''));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [], 'Erro ao pesquisar usuario'));
        }
    }

    public async read(req: Request, res: Response): Promise<Response> {
        try {
            const user = await UsuarioRepository.read();
            return res.status(200)
                .json(Retorno.Sucesso(true, [...user], 'Lista de Usuario'));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [], 'Erro ao pesquisar lista de Usuarios'));
        }
    }
}

export default new UsuarioController();
