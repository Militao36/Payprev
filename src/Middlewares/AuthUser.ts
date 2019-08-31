import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Retorno from '../Utils/Retorno';
import Secret from '../config/Secret';

// Imports de intefaces
import { Decoded } from '../interfaces/Decoded';

const Auth = (req: Request, res: Response, next: () => void): Response => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json(Retorno.Sucesso(false, [], 'Token não foi informado'));
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json(Retorno.Sucesso(false, [], 'Token error'));
    }

    const [scheme, token] = parts;

    if (!(/^Bearer$/i.test(scheme))) {
        return res.status(401).json(Retorno.Sucesso(false, [], 'Token em formato incorreto'));
    }

    jwt.verify(token, Secret.secret, (err, decoded: Decoded) => {
        if (err) {
            return res.status(401).json(Retorno.Sucesso(false, [], 'Token invalido'));
        }

        req.body.userId = decoded.id;
        return next();
    });
};

export default Auth;
