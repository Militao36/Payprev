# Desafio Payprev

### Features
- Cadastro de Usuário (Admin ou Comum).
- Autenticação JWT.
- Cadastro/Pesquisa de usuários do github para salvar no banco de dados.
- Crianção de Listas e Edições e exclusões, para organizar usuários.
- Adicionar usuários nas listas e remover.
- Adicionar tags aos usuários nas listas.


### Como usar a API.
Primeiro você deve se cadastrar na API. 
Após se cadastrar , faça o login é receberá o token de volta, o mesmo deverá ser usado em todas as requisições ao servidor, apenas no cadastro e login que são dispensaveis.

##Rotas disponivels para o Admin
- **[ POST ] **/Usuario/cadastro

>   Para realizar o cadastro de usuários, deverá ser passado um JSON, no formato especificado abaixo.
  

    {
        "email": "", // String, Obrigatório, Único
        "senha": "",// String.
        "cpf": "",// String, Obrigatório, Único
        "tipoUsuario": ""// Enum (ADMIN,COMUM) , Obrigatório.
    }
- **[ POST ]** /Usuario/login

>Para realizar o login, deverá ser passado um JSON, no formato abaixo, que lhe retornará o token, para se autenticar na aplicação.
  
    {
        "email": "", // String
        "senha": ""// String
    }

- **[ GET ]** /Usuario/admin/user/:nome

> Está rota e utilizada, para o ADMIN, informar qual usuário gostaria de pesquisar no github, e inserir no banco de dados. Para utiliza-la basta apenas realizar uma requisição do tipo `GET`, apenas trocando o campo `:nome`, pelo usuário que gostaria de pesquisar é inserir.


- **[ PUT ]** /Usuario/admin/:id

> Está rota e utilizada para, atualizar o cadastro, de usuários, cadastrados para usar a API. Deve-se relizar uma request do tipo `PUT`, trocando o `:id` para o `id` do usuário cadastrado.

```javascript
 	{
        "email": "", // String, Obrigatório, Único
        "senha": "",// String.
        "cpf": "",// String, Obrigatório, Único
        "tipoUsuario": ""// Enum (ADMIN,COMUM) , Obrigatório.
    }
```

- **[ DELETE ]** /Usuario/admin/:id

> Está rota e utilizada para deletar o usuário cadastrado, deve ser feito uma request do tipo `DELETE` para a API, trocando apenas o `:id` pelo código de usuário que deseja deletar.

- **[ GET ]** /Usuario/admin/:id

> Está rota e utilizada para realizar a pesquisa de usuários pelo código,  deve ser feito uma request do tipo `GET` para a API, trocando apenas o `:id` pelo código de usuário que deseja pesquisar.

- **[ GET ]** /Usuario/admin

> Está rota e utilizada para realizar a pesquisa de todos usuários,deve ser feito uma request do tipo `GET` para a API.