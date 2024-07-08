# Projeto FlexiLease Autos 📽️🎞️

FlexiLease Autos é uma API REST desenvolvida para gerenciar uma concessionária especializada na locação de veículos, facilitando o cadastro e a gestão dos carros, usuários e reservas. A API implementa funcionalidades essenciais e segue boas práticas de desenvolvimento para garantir a integridade e a manutenibilidade dos dados.

## Objetivos da API
 
- **Cadastro de Carros**: Permitir o registro, atualização, listagem e exclusão.
- **Gerenciamento de Usuários**: Facilitar o cadastro, atualização e exclusão dos Usuários.
- **Controle das Reservas**: Oferecer a criação, atualização e exclusão das locações realizadas.
 
## Tecnologias Utilizadas 🛠
 
- **Backend**: Node.js com Typescript
- **Banco de Dados**: MongoDB
- **ORM**: Mongoose
- **Documentação**: Swagger
- **Middleware**: Zod

### Documentação com Swagger
 
A documentação completa da API Compacine está disponível através do Swagger. Esta ferramenta oferece uma interface intuitiva para testar os endpoints da API, além de fornecer um arquivo .json com as configurações de todos os endpoints.

Para acessar a documentação localmente, basta rodar o projeto e abrir o seguinte link em seu navegador:
 
```bash
http://localhost:3333/api/v1/doc
```
 
Isso permitirá que você explore todos os endpoints, parâmetros e exemplos de requisições diretamente em seu ambiente de desenvolvimento.
 
### Acessando a Documentação
 
Na documentação, você encontrará:
 
- **Descrições detalhadas de cada endpoint**: Incluindo os métodos HTTP permitidos, parâmetros esperados, e exemplos de requisições.
- **Respostas esperadas**: Informações sobre os códigos de status HTTP.
- **Exemplos interativos**: A capacidade de testar requisições diretamente na documentação, o que facilita a experimentação e o desenvolvimento.

## Configuração Local para usar a API
 
Para configurar o projeto localmente, siga estes passos:
 
Clone o repositório:
 
```bash
 git clone https://github.com/frosipedro/API-FlexiLeaseAutos-DesafioUOL.git
```

## Navegue até o diretório do projeto:
 
```bash
  cd API-FlexiLeaseAutos-DesafioUOL
```

## Instale as dependências:
 
```bash
  npm install
```

### Configuração
 
Configure as variáveis de ambiente necessárias no arquivo `.env`.

```bash
  MONGO_URL=mongodb://localhost:27017/FlexiLeaseAutos
```
```bash
  PORT=3000
```
 
## Executar a aplicação
 
Para executar a aplicação, rode o seguinte comando no terminal:
 
```bash
  npm run start
```

O projeto agora deve estar sendo executado localmente. Você pode acessá-lo em http://localhost:3000/api/v1/.
