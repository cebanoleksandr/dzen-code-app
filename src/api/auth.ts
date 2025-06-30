import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dzen-code-app-be.vercel.app/users',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const login = async (email: string, password: string) => {
  return await api.post('/login', { email, password });
}

export const register = async (email: string, password: string) => {
  return await api.post('/register', { email, password });
}
