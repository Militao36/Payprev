import req from 'supertest';
import server from '../../dist/app';

test('Cadastro de usuario', async () => {
    const user = {
        email: '4devas@gmail.com',
        senha: '123456',
        cpf: '14361347654',
        tipoUsuario: 'ADMIN',
    };

    const res = await req(server)
        .post('/Usuario/cadastro')
        .send(user);
    expect(res.status).toBe(201);
});
