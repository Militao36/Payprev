# Desafio Payprev

#### Configurações iniciais
- **URL Inicial** - http://179.188.38.17:443

> Todas as requisições devem ser feita com a URL acima como padrão

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

###Rotas disponivels para o Admin

- **[ POST ]**/Usuario/cadastro

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

 	{
        "email": "", // String, Obrigatório, Único
        "senha": "",// String.
        "cpf": "",// String, Obrigatório, Único
        "tipoUsuario": ""// Enum (ADMIN,COMUM) , Obrigatório.
    }

- **[ DELETE ]** /Usuario/admin/:id

> Está rota e utilizada para deletar o usuário cadastrado, deve ser feito uma request do tipo `DELETE` para a API, trocando apenas o `:id` pelo código de usuário que deseja deletar.

- **[ GET ]** /Usuario/admin/:id

> Está rota e utilizada para realizar a pesquisa de usuários pelo código,  deve ser feito uma request do tipo `GET` para a API, trocando apenas o `:id` pelo código de usuário que deseja pesquisar.

- **[ GET ]** /Usuario/admin

> Está rota e utilizada para realizar a pesquisa de todos usuários,deve ser feito uma request do tipo `GET` para a API.

<br>
## Rotas disponivels para o Usuário Comum

- **[ POST ]** /Usuario/comum/lista

> Está rota e utilizada para realizar o cadastro de novas listas, para utilizalá deve se fazer uma requisição `POST`, passando o **JSON** abaixo.

	{
		"nameLista":"" //String, Obrigatório, Unico
	}

- **[ PUT ]** /Usuario/comum/lista/:id

> Está rota e utilizada para realizar a atualização de uma lista, para utiliza-la deve se fazer um requisição `PUT`, alterado apenas o `:id` pelo id da lista que quer atualizar.

	{
		"nameLista":"" //String, Obrigatório, Unico
	}

- **[ DELETE ]** /Usuario/comum/lista/:id

> Está rota e utilizada para realizar a remoção de uma lista, para utiliza-la deve se fazer um requisição `DELETE`, alterado apenas o `:id` pelo id da lista que quer remover

- **[ GET ]** /Usuario/comum/lista

> Está rota e utilizada para pegar a todas as listas cadastradas, para utilizar deve se fazer uma requisição `GET`.

- **[ POST]** /Usuario/comum/adicionar/userListas

> Está rota e utilizada para adicionar um usuário em uma lista, para usar deve se realizar uma requisição `POST`, passando o JSON abaixo.

	{
		"lista":"", // Nome da lista que deseja adicionar
		"usuario":"" // Nome do usuário do github que deseja inserir na lista.
	}

- **[ POST ]** /Usuario/comum/deletar/userListas

> Está rota e utilizada para remover um usuário em uma lista, para usar deve se realizar uma requisição `POST`, passando o JSON abaixo.

	{
		"lista":"", // Nome da lista que deseja adicionar
		"usuario":"" // Nome do usuário do github que deseja inserir na lista.
	}

- **[ POST ]** /Usuario/comum/adicionar/tags

>Está rota e utilizada para adicionar tags em um usuário na lista, para usar deve se realizar uma requisição `POST`, passando o JSON abaixo.

	{
		"lista":"", // Nome da lista que deseja adicionar
		"usuario":"", // Nome do usuário do github que deseja inserir na lista.
		"tags:":""//Tags para adicionar ao usuário, deve ser separado por virgula
	}

- ** [ POST ] /Usuario/comum/remover/tags

>Está rota e utilizada para remover tags de um usuário na lista, para usar deve se realizar uma requisição `POST`, passando o JSON abaixo.

	{
		"lista":"", // Nome da lista que deseja adicionar
		"usuario":"", // Nome do usuário do github que deseja inserir na lista.
	}

- **[ GET ]** /Usuario/comum/getLista/completa

>Está rota e utilizada para pegar a listagem de todas as listas com respectivos usuários, que se encontram dentro da mesma, para usar realizar uma requsição do tipo `GET`.



### Retornos da API
- Toda a API tem um padrão de retorno, abaixo está o JSON de exemplo, toda a API segue esse padrão de retorno.

		{
		  "Sucesso": true, // True caso der certo, e false se der errado
		  "Body": [], // caso sua request retorne algo, ex: Lista de usuários.
		  "Mensagem": "TAGS ADICIONADAS AO USUÁRIO" // Mensagem de retorno
		}

### Dúvidas
- Caso tenha alguma dúvida ou encontre um erro crie um Issues.
- Email: matheusmoreira3693@gmail.com


