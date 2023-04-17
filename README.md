# NODE AUTHENTICATION JWT

## Instalação

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Configure as variáveis de ambiente com as informações do Firestore

## Uso

Para usar a API, siga os seguintes passos:

1. Inicie o servidor com `npm run dev`
2. Acesse `http://localhost:3000` em seu navegador ou use um cliente HTTP para enviar requisições.

## Autenticação

A autenticação é feita através de JWT. Para obter um token de acesso, faça uma requisição POST para `/auth/login` com um payload JSON contendo o `email` e `password` do usuário. O token será retornado no corpo da resposta.

As rotas que exigem autenticação devem ser acessadas enviando o token no header `Authorization` no formato `Bearer <token>`.

## Banco de Dados

A API usa o Firestore como banco de dados. As informações de acesso devem ser configuradas nas variáveis de ambiente.

## Exemplo de dados

Segue abaixo um exemplo de como os dados estão organizados no Firestore:

<code>
{
  "email": "usuario1",
  "name": "senha1",
  "pass": "bcrypt hash"
}
</code>


## Contribuição

Sinta-se livre para contribuir com a API.
