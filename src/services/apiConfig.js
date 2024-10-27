import Axios from "axios";
//require('dotenv').config();

const Api = Axios.create({
  baseURL: "https://projeto-renovacao.web.app",  // URL base da API
  //baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Opcional: interceptores para manipular requisições e respostas
Api.interceptors.response.use(
  (response) => response, // Sucesso
  (error) => {
    console.error("Erro na resposta da API:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default Api;