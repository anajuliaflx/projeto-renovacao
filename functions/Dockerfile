# Use uma imagem base do Node.js
FROM node:21.7.3

# Diretório de trabalho no contêiner
WORKDIR /app

# Copie apenas os arquivos necessários da pasta `renovacao_api`
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da pasta `renovacao_api`
COPY . ./functions

# Exponha a porta usada pela API
EXPOSE 5001

# Comando para rodar a API
CMD ["npm", "run", "serve"]