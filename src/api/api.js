import axios from 'axios';

const api = axios.create({
  baseURL: 'https://express-postgre-bloco.vercel.app/', // ajuste para seu backend
});

// Intercepta todas requisições e adiciona o token se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
