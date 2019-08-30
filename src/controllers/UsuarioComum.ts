import { Request, Response } from 'express';
import ListasUserGit from '../Repositories/ListasUserGit';

class UsuarioComumController {
    public async read(req: Request, res: Response): Promise<Response> {
        return res.json(await ListasUserGit.getListas());
    }

}
export default new UsuarioComumController();
