import { Request, Response } from 'express';
import ListasUserGit from '../Repositories/ListasUserGit';
import Retorno from '../Utils/Retorno';
import { isNumber } from 'util';
import UsuarioRepository from '../Repositories/UsuarioRepository';

class UsuarioComumController {
    // Listagem usuarios github
    public async getAllUserGit(req: Request, res: Response): Promise<Response> {
        try {
            const user = await UsuarioRepository.read();
            return res.status(200)
                .json(Retorno.Sucesso(true, [...user], 'Lista de Usuarios'));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [], 'Erro ao pesquisar lista de Usuarios'));
        }
    }

    public async criarLista(req: Request, res: Response): Promise<Response> {
        try {
            const { nameLista } = req.body;
            await ListasUserGit.createLista({ nameLista });
            return res
                .status(201).json(Retorno.Sucesso(true, [], 'Lista criada com sucesso'));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [], 'Erro ao criar lista'));
        }
    }

    public async updateLista(req: Request, res: Response): Promise<Response> {
        try {
            const { nameLista } = req.body;
            if (isNumber(req.params.id)) {
                return res.status(400)
                    .json(Retorno.Sucesso(false, [], 'Parametro passando não e um numero valido'));
            }
            await ListasUserGit.updateLista({ idLista: parseInt(req.params.id.toString(), null), nameLista });
            return res
                .status(201).json(Retorno.Sucesso(true, [], 'Lista atualizada com sucesso'));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [], 'Ocorrreu um erro ao atualizar a lista'));
        }
    }

    public async deletLista(req: Request, res: Response): Promise<Response> {
        try {
            if (isNumber(req.params.id)) {
                return res.status(400).json(Retorno.Sucesso(false, [], 'Parametro passando não e um numero valido'));
            }
            await ListasUserGit.deleteLista(parseInt(req.params.id, null));
            return res.status(200)
                .json(Retorno.Sucesso(true, [], 'Registro deletado com sucesso'));
        } catch (error) {
            return res
                .status(400)
                .json(Retorno.Sucesso(false, [], 'Erro ao deletar cadastro de usuario'));
        }
    }

    // adicionar, remover lista
    public async addUserLista(req: Request, res: Response): Promise<Response> {
        try {
            const { lista, usuario } = req.body;
            const result = await ListasUserGit.addUserLista(lista, usuario);
            return res
                .status(201).json(Retorno.Sucesso(true, [], result.toUpperCase()));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [], 'Ocorreu um erro ao adicionar usuario na lista'));
        }
    }

    public async deleteUserLista(req: Request, res: Response): Promise<Response> {
        try {
            const { lista, usuario } = req.body;
            const result = await ListasUserGit.deleteUserLista(lista, usuario);
            return res
                .status(201).json(Retorno.Sucesso(true, [], result.toUpperCase()));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [], 'Ocorreu um erro ao excluir usuario na lista'));
        }
    }

    public async addTags(req: Request, res: Response): Promise<Response> {
        try {
            const { lista, usuario, tags } = req.body;
            const result = await ListasUserGit.addTags(lista, usuario, tags.split(','));
            return res
                .status(201).json(Retorno.Sucesso(true, [], result.toUpperCase()));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [error], 'Ocorreu um erro ao adicionar tags no usuário'));
        }
    }

    public async removeTags(req: Request, res: Response): Promise<Response> {
        try {
            const { lista, usuario } = req.body;
            const result = await ListasUserGit.removeTags(lista, usuario, []);
            return res
                .status(201).json(Retorno.Sucesso(true, [], result.toUpperCase()));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [error], 'Ocorreu um erro ao deletar tags no usuário'));
        }
    }

    public async getListas(req: Request, res: Response): Promise<Response> {
        try {

            const result = await ListasUserGit.getListaCadastradas();
            return res
                .status(201).json(Retorno.Sucesso(true, result, 'Lista de todas as listas'));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [], 'Ocorreu um erro ao pesquisar lista'));
        }
    }

    public async getListaCompleta(req: Request, res: Response): Promise<Response> {
        try {

            const result = await ListasUserGit.getListas();
            return res
                .status(201).json(Retorno.Sucesso(true, result, 'Lista de todas as listas'));
        } catch (error) {
            return res.status(400)
                .json(Retorno.Sucesso(false, [], 'Ocorreu um erro ao gerar lista completa'));
        }
    }
}
export default new UsuarioComumController();
