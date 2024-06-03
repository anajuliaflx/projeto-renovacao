
# <h1 align="center">RenovAção</h1>

<p align="center">
  <img src="src/img/logoreadme.png" alt="Descrição da Imagem">
</p>

O projeto RenovAção tem como público-alvo os agressores de ciberbullying e as Instituições de Ensino Superior (IES). É uma plataforma que visa oferecer suporte tanto aos agressores quanto às instituições, fornecendo ferramentas para conscientização, prevenção e reabilitação do comportamento agressivo, além de oferecer suporte psicológico e recursos educativos.

### Propósito da Plataforma RenovAção:

A plataforma RenovAção tem como objetivo primordial oferecer um ambiente seguro e de apoio para indivíduos envolvidos em casos de ciberbullying. Suas principais áreas de atuação incluem:

- **Agenda de cumprimento de cargas horárias:** O administrador pode cadastrar atividades educativas e de reabilitação para os agressores, visando promover a reflexão e mudança de comportamento.

- **Suporte psicológico:** A plataforma proporciona acesso a sessões de apoio psicológico tanto para os agressores quanto para as vítimas de ciberbullying. Isso inclui acompanhamento individualizado e orientações para lidar com os desafios emocionais relacionados ao comportamento agressivo e ao trauma causado pelo ciberbullying.

- **Recursos educativos:** Além das intervenções diretas, a RenovAção disponibiliza uma trilha educativa com vídeos, artigos e atividades interativas. Esses recursos visam fornecer conhecimento e habilidades para prevenir o ciberbullying e promover relações saudáveis online.

Essas iniciativas da RenovAção não apenas visam a recuperação dos agressores, mas também buscam capacitar as Instituições de Ensino Superior a lidar com casos de ciberbullying e a promover uma cultura de respeito e inclusão digital em seus ambientes online.

## Apêndice

Este apêndice fornece uma visão mais detalhada do projeto de combate ao ciberbullying, com foco nos públicos-alvo e funcionalidades principais.

## Público-Alvo
O projeto visa atender principalmente dois grupos:

Agressor: Estudantes que se envolvem em comportamentos de ciberbullying, conscientizando-os sobre as consequências de suas ações e fornecendo recursos educativos para promover uma mudança de comportamento positiva.

Instituições de Ensino Superior (IES): Profissionais do Núcleo de Apoio a Estudante(NAE) das instituições de ensino superior, fornecendo ferramentas para prevenir e lidar com casos de ciberbullying entre os alunos, além de promover um ambiente online seguro e inclusivo.

## Funcionalidades

### Perfil do Aluno

Trilha Educativa: Oferece uma série de vídeos educativos que abordam temas relacionados ao ciberbullying, suas consequências e estratégias de prevenção.

Agenda: Permite que os alunos visualizem um cronograma com datas importantes, incluindo consultas psicológicas e outras atividades relevantes.

Mensagens: Fornece um meio de comunicação seguro e privado entre os alunos e outros perfis no sistema, como administradores e psicólogos.

### Perfil do Administrador

Cronograma: Permite ao administrador criar e gerenciar um calendário de eventos, incluindo consultas, workshops e outras atividades relacionadas à prevenção do ciberbullying.

Usuários: Permite ao administrador visualizar os usuários existentes no sistema e cadastrar novos usuários, incluindo alunos, psicólogos e outros administradores, atribuindo-lhes os papéis apropriados e configurando suas permissões de acesso.

Relatórios: Oferece acesso a relatórios detalhados sobre o acompanhamento de casos de ciberbullying, avaliação dos atribuída pelos psicólogos e outras métricas relevantes.

Mensagens: Permite que o administrador se comunique diretamente com os alunos e psicólogos por meio de mensagens internas.

### Perfil do Psicólogo

Agenda: Permite ao psicólogo visualizar e gerenciar suas consultas psicológicas agendadas com os alunos.

Acompanhamento: Oferece ferramentas para o psicólogo acompanhar o progresso dos alunos, avaliar seu bem-estar emocional e oferecer suporte individualizado conforme necessário.

Mensagens: Permite que o psicólogo se comunique diretamente com os alunos e administrador por meio de mensagens seguras e confidenciais.

## Pré-requisitos

Para executar e desenvolver este projeto, certifique-se de atender aos seguintes requisitos:

* Sistema Operacional: Pode ser utilizado em `<Windows / Linux / Mac>`

* Node.js e npm: Certifique-se de ter o Node.js instalado em sua máquina. O npm (Node Package Manager) é instalado automaticamente com o Node.js.
Node.js: `>= 18.0.0` e `<= 20.13.1>`
npm: Versão incluída no Node.js

* Editor de Código: Você pode usar qualquer editor de código de sua preferência.

## Configuração e execução do projeto

Para instalar o RenovAção, siga as etapas descritas abaixo:

### Clone o projeto

```bash
  git clone https://github.com/anajuliaflx/projeto-renovacao.git
```

Em seguida acesse o projeto pela IDE de sua preferência

```bash
  code .
```

### Instalação de dependências

Realize a instalação das dependências descritas abaixo no diretório principal

```bash
  npm install react-router-dom --save
```

```bash
  npm install formik yup axios dotenv moment
```

```bash
  npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
```

```bash
  npm install react-big-calendar react-modal
```

Instale as dependências no diretório functions

```bash
  npm install bcrypt express mysql2 nodemon cors
```
```bash
  npm install dotenv
```

### Configure o Banco de Dados

Edite a configuração do banco de dados no arquivo principal, de acordo com seu ambiente. Abra o arquivo `index.js` presente na pasta `functions` e encontre a seção onde a conexão com o banco de dados é definida.

    ```javascript
    const db = mysql.createConnection({
      host: "",
      port: "",
      user: "",
      password: "",
      database: "",
    });
    ```

Certifique-se de fornecer as informações corretas do seu banco de dados, incluindo host, porta, nome de usuário, senha e nome do banco de dados.

### Configure a URL base do projeto

Edite a URL base nos arquivos presentes no caminho src/pages

## Execução

Para iniciar a aplicação, siga estas etapas:

```bash
  npm run build
```
E em seguida
```bash
  npm start
```

## Documentação do projeto

### Documento

[Projeto RenovAção]

### Cores

| Cor               | Hexadecimal                                                |
| ----------------- | ---------------------------------------------------------------- |
| Branco       | ![#FFFFFF](https://via.placeholder.com/10/FFFFFF?text=+) #FFFFFF |
| Preto       | ![#000000](https://via.placeholder.com/10/000000?text=+) #000000 |
| Ciano forte       | ![#0395BA](https://via.placeholder.com/10/0395BA?text=+) #0395BA |
| Cinza escuro       | ![#848484](https://via.placeholder.com/10/848484?text=+) #848484 |
| Azul ligeiramente dessaturado       | ![#8390C8](https://via.placeholder.com/10/8390C8?text=+) #8390C8 |

## Documentação da API

### URL Base
A URL base para todos os endpoints é

```https
    https://projeto-renovacao.web.app/
```

### Cadastro de usuário
```https
  POST /admincadastro
```
Cria um novo usuário no banco de dados.

#### Corpo da requisição
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. O nome do usuário. |
| `email` | `string` | **Obrigatório**. O email do usuário. |
| `senha` | `string` | **Obrigatório**. A senha do usuário. |
| `matricula` | `string` | **Obrigatório**. A matrícula do usuário. |
| `tipoUsuario` | `string` | **Obrigatório**. O tipo do usuário. |
|

#### Respostas
- `200 OK`: Usuário cadastrado com sucesso.
  ```json
  {
  "msg": "Usuário cadastrado com sucesso"
  }

- `400 Bad Request`: Email ou matrícula já cadastrados.
  ```json
  {
    "msg": "Email ou matrícula já cadastrados"
  }

- `500 Internal Server Error`: Ocorreu um erro.
  ```json
  {
    "error": "Mensagem de erro"
  }

### Login de usuário
```https
  POST /login
```
Autentica um usuário.

#### Corpo da requisição
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. O email do usuário. |
| `senha` | `string` | **Obrigatório**. A senha do usuário. |
|

#### Respostas
- `200 OK`: Usuário logado com sucesso.
  ```json
  {
    "msg": "Usuário logado",
    "tipoUsuario": "userType",
    "matricula": "matricula"
  }

- `401 Unauthorized`: Senha incorreta.
  ```json
  {
    "msg": "Senha incorreta"
  }

- `404 Not Found`: Usuário não registrado.
  ```json
  {
    "msg": "Usuário não registrado!"
  }

- `500 Internal Server Error`: Ocorreu um erro.
  ```json
  {
    "error": "Mensagem de erro"
  }

### Listar usuários
```https
  GET /adminusuario
```
Lista os usuários com paginação.

#### Parâmetros da query
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `page` | `number` | **Opcional**. Número da página (default 1). |
| `limit` | `number` | **Opcional**. Limite de usuários por página (default 10). |
|

#### Respostas
- `200 OK`: Lista de usuários com paginação.
  ```json
  {
    "users": [/* lista de usuários */],
    "totalPages": 5
  }

- `500 Internal Server Error`: Ocorreu um erro.
  ```json
  {
    "error": "Mensagem de erro"
  }

### Excluir usuário por ID
```https
  DELETE /adminusuario/:id
```
Exclui um usuário pelo ID.

#### Parâmetros da URL
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `number` | **Obrigatório**. O ID do usuário a ser excluído. |
| 

#### Respostas
- `200 OK`: Usuário excluído com sucesso.
  ```json
  {
  "msg": "Usuário excluído com sucesso"
  }

- `500 Internal Server Error`: Ocorreu um erro.
  ```json
  {
    "error": "Mensagem de erro"
  }

### Enviar mensagem
```https
  POST /mensagem
```
Envia uma mensagem.

#### Corpo da requisição
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `remetente_id` | `number` | **Obrigatório**. O ID do remetente. |
| `destinatario_tipo` | `string` | **Obrigatório**. O tipo de destinatário ('administrador' ou 'psicologo'). |
| `mensagem` | `string` | **Obrigatório**. O conteúdo da mensagem. |
| 

#### Respostas
- `200 OK`: Mensagem enviada com sucesso.
  ```json
  {
  "msg": "Mensagem enviada com sucesso"
  }

- `400 Bad Request`: A mensagem não pode ter mais de 400 caracteres.
  ```json
  {
    "msg": "A mensagem não pode ter mais de 400 caracteres"
  }

- `500 Internal Server Error`: Ocorreu um erro.
  ```json
  {
    "error": "Mensagem de erro"
  }

### Obter usuário por matrícula
```https
  GET /adminusuario/:matricula
```
Cria um novo usuário no banco de dados.

#### Parâmetros da URL
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `matricula` | `string` | **Obrigatório**. A matrícula do usuário. |
|

#### Respostas
- `200 OK`: Retorna o ID do usuário.
  ```json
  {
    "id": 1
  }

- `404 Not Found`: Usuário não encontrado.
  ```json
  {
    "msg": "Usuário não encontrado"
  }

- `500 Internal Server Error`: Ocorreu um erro.
  ```json
  {
    "error": "Mensagem de erro"
  }

### Enviar resposta
```https
  POST /resposta/:tipoUsuario
```
Envia uma resposta a uma mensagem.

#### Parâmetro da URL
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `tipoUsuario` | `string` | **Obrigatório**. O tipo de usuário ('administrador' ou 'psicologo'). |
|

#### Corpo da requisição
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `mensagem_id` | `number` | **Obrigatório**. O ID da mensagem. |
| `resposta` | `string` | **Obrigatório**. O conteúdo da resposta. |
| `matricula` | `string` | **Obrigatório**. A matrícula do respondente. |
|

#### Respostas
- `200 OK`: Resposta enviada com sucesso.
  ```json
  {
  "msg": "Resposta enviada com sucesso",
  "data_resposta": "2023-05-15T13:45:30.000Z",
  "resposta": "Conteúdo da resposta"
  }

- `400 Bad Request`: Tipo de usuário inválido ou campos obrigatórios ausentes.
  ```json
  {
    "msg": "Tipo de usuário inválido"
  }

- `500 Internal Server Error`: Ocorreu um erro.
  ```json
  {
    "error": "Mensagem de erro"
  }

### Listar mensagens
```https
  GET /mensagens/:tipoUsuario
```
Lista as mensagens recebidas pelo tipo de usuário com paginação.

#### Parâmetro da URL
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `tipoUsuario` | `string` | **Obrigatório**. O tipo de usuário ('administrador' ou 'psicologo'). |
|

#### Corpo da requisição
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `page` | `number` | **Opcional**. Número da página (default 1). |
| `limit` | `number` | **Opcional**. Limite de mensagens por página (default 10). |
|

#### Respostas
- `200 OK`: Lista de mensagens com paginação.
  ```json
  {
  "messages": [/* lista de mensagens */],
  "totalPages": 5
  }

- `400 Bad Request`: Tipo de usuário inválido.
  ```json
  {
    "msg": "Tipo de usuário inválido"
  }

- `500 Internal Server Error`: Ocorreu um erro.
  ```json
  {
    "error": "Mensagem de erro"
  }

### Listar mensagens e respostas por aluno
```https
  GET /mensagens-respostas/:matricula
```
Envia uma resposta a uma mensagem.

#### Parâmetro da URL
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `matricula` | `string` | **Obrigatório**. A matrícula do aluno. |
|

#### Corpo da requisição
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `page` | `number` | **Opcional**. Número da página (default 1). |
| `limit` | `number` | **Opcional**. Limite de mensagens por página (default 10). |
|

#### Respostas
- `200 OK`: Lista de mensagens e respostas com paginação.
  ```json
  {
  "messagesAndAnswers": [/* lista de mensagens e respostas */],
  "totalPages": 5
  }

- `404 Not Found`: Usuário não encontrado.
  ```json
  {
    "msg": "Usuário não encontrado"
  }

- `500 Internal Server Error`: Ocorreu um erro.
  ```json
  {
    "error": "Mensagem de erro"
  }

## Melhorias


## Contribuindo


## Feedback


## Autores

- [@anajulia](https://github.com/anajuliaflx)
- [@arielmartins](https://github.com/martinsariel)
- [@edmilsonpessoa](https://github.com/edmilsonpmfilho)