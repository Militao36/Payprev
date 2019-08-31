import { Request, Response } from 'express';
import UsuarioRepository from '../Repositories/UsuarioRepository';
import Retorno from '../Utils/Retorno';
import generetaToken from '../Utils/GenerateToken';
import { isNumber } from 'util';
import RemoveCharCPf from '../Utils/RetirarCharCpf';
import axios from 'axios';

import UserGitRepository from '../Repositories/UsuariosGitRepository';

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
            const body = { email, senha, cpf: RemoveCharCPf(cpf), tipoUsuario };

            const validacoes = await UsuarioRepository.validacoes(body, false);
            if (validacoes.length > 0) {
                return res.status(400)
                    .json(Retorno.Sucesso(false, [...validacoes], 'O cadastro não passou em algumas validações'));
            }
            const user = await UsuarioRepository.save(body);
            res.status(201)
                .json(Retorno.Sucesso(true, [...user], 'Usuario cadastrado com sucesso'));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [error], 'Erro ao realizar cadastro'));
        }
    }

    public async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const { email, senha, cpf, tipoUsuario } = req.body;
            const body = { email, senha, cpf: RemoveCharCPf(cpf), tipoUsuario };

            if (isNumber(req.params.id)) {
                return res.status(400)
                    .json(Retorno.Sucesso(false, [], 'Parametro passando não e um numero valido'));
            }

            const validacoes = await UsuarioRepository.validacoes({ idUser: parseInt(req.params.id, null), ...body }, true);
            if (validacoes.length > 0) {
                return res.status(400)
                    .json(Retorno.Sucesso(true, [...validacoes], 'O cadastro não passou em algumas validações'));
            }

            await UsuarioRepository.update({ idUser: parseInt(req.params.id, null), ...body });
            return res.status(201)
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

    // Comando usuario admin
    public async cadastrarUsuarioGit(req: Request, res: Response): Promise<Response> {
        try {
            const nome = req.params.nome;
            const result = await axios.get(`https://api.github.com/users/${nome}`);
            const { login, name, bio, location, html_url } = result.data;
            const body = { login, name, bio, location, html_url };

            const validacoes = await UserGitRepository.validacoes(body);
            if (validacoes.length > 0) {
                res.status(400)
                    .json(Retorno.Sucesso(true, [...validacoes], 'O cadastro não passou em algumas validações'));
            }
            await UserGitRepository.save(body);
            return res.status(200)
                .json(Retorno.Sucesso(true, [], 'Usuario do github, inserido no banco de dados'));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [error], 'Ocorreu um erro ao pesquisar usuario no github, e inserir no banco de dados'));
        }

    }
}

export default new UsuarioController();
