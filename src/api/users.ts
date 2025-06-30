import axios from 'axios';

export type UpdateUserDTO = { firstName?: string, lastName?: string, userId: string, photoUrl?: string }

const token = localStorage.getItem('accessToken');

const api = axios.create({
  baseURL: 'https://dzen-code-app-be.vercel.app/users',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

export const fetchUsers = async ({ query }:{ query?: string }) => {
  let url = '';
  const queryParams = new URLSearchParams();

  if (query) {
    queryParams.append('query', query);
  }

  const queryString = queryParams.toString();

  if (queryString) {
    url = `?${queryString}`;
  } else {
    url = '/';
  }

  return await api.get(url);
}

export const getUserById = async (id: string) => {
  return await api.get(`/${id}`);
}

export const updateUser = async (updateUserDTO: UpdateUserDTO) => {
  const { userId, ...body } = updateUserDTO;
  return await api.patch(`/${updateUserDTO.userId}`, body);
}

export const deleteUser = async (id: string) => {
  return await api.delete(`/${id}`);
}