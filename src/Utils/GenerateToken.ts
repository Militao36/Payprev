import jwt from 'jsonwebtoken';
import Secret from '../config/Secret';

export default function generetaToken(user: number): string {
    return jwt.sign({ id: user }, Secret.secret, {
        expiresIn: 86400,
    });
}
