# Descrição do Projeto
# <h1 align="center">RenovAção</h1>

<p align="center">
  <img src="src\componentes\img\logoreadme.png" alt="Descrição da Imagem">
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

# Como baixar o repositorio (lista de comandos)
### Clone o projeto

```bash
  git clone https://github.com/edmilsonpmfilho/RenovAcaoAPI.git
```

Em seguida acesse o projeto pela IDE de sua preferência

```bash
  code .
```
# Pré-requisitos
Para executar e desenvolver este projeto, certifique-se de atender aos seguintes requisitos:

* Sistema Operacional: Pode ser utilizado em `<Windows / Linux / Mac>`

* Node.js e npm: Certifique-se de ter o Node.js instalado em sua máquina. O npm (Node Package Manager) é instalado automaticamente com o Node.js.
Node.js: `>= 18.0.0` e `<= 20.13.1>`
npm: Versão incluída no Node.js

* Editor de Código: Você pode usar qualquer editor de código de sua preferência.
## Configuração e execução do projeto

Para instalar o RenovAção, siga as etapas descritas abaixo:



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
```bash
  npm install express-session
```
```bash
  npm install joi
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
# Como contribuir(lista de comando e pull request)

Contribuições são bem-vindas! Siga os passos abaixo para contribuir com este projeto.

1. Faça um fork do repositório

Clique no botão Fork no canto superior direito da página do repositório (no GitHub).
Isso criará uma cópia do repositório na sua conta.

2. Clone o repositório forkado

No terminal, execute o comando abaixo para clonar o repositório para o seu computador:

```bash
    git clone https://github.com/anajuliaflx/projeto-renovacao.git
```
3. Configure o repositório remoto original

Adicione o repositório original como um "remote" chamado upstream para manter seu fork atualizado:

```bash
git remote add upstream https://github.com/anajuliaflx/projeto-renovacao.git
git remote -v
```

4. Crie uma nova branch

Sempre crie uma nova branch para trabalhar na sua contribuição. Escolha um nome que descreva a mudança que você pretende fazer:

```bash
git checkout -b nome-da-sua-branch
```

-   Exemplo:
```bash
git checkout -b corrigir-bug-login
```

5. Faça as mudanças

Edite os arquivos necessários no seu editor de código. Após terminar, salve suas alterações.

6. Commit das alterações

Adicione suas alterações ao controle de versão e faça um commit com uma mensagem descritiva:

```bash
git add .
git commit -m "Descrição breve do que foi alterado"
```

- Exemplo:

```bash
git commit -m "Corrige bug no formulário de login"
```

7. Envie a branch para o seu fork

Suba sua branch para o repositório forkado no GitHub:

```bash
git push origin nome-da-sua-branch
```

8. Crie um Pull Request

    1. Acesse o repositório original no GitHub.
    2. Clique em Compare & Pull Request.
    3. Preencha as informações necessárias, descrevendo as mudanças feitas.
    4. Envie o Pull Request para revisão.

9. Mantenha seu fork atualizado

Para evitar conflitos futuros, mantenha seu fork sincronizado com o repositório original:

```bash
git checkout main
git pull upstream main
git push origin main
```

10. Acompanhe a revisão

Os mantenedores podem comentar no seu Pull Request pedindo ajustes ou melhorias. Faça as alterações solicitadas e envie os novos commits para a mesma branch:

```bash
git add .
git commit -m "Realiza ajustes solicitados na revisão"
git push origin nome-da-sua-branch
```

- Dicas
    - Certifique-se de seguir o guia de estilo e padrões do projeto.
    - Escreva mensagens de commit claras e descritivas.
    - Teste suas alterações antes de enviar o Pull Request.