import axios from 'axios';

export type CreateOrderDTO = { title: string, description: string, authorId: string };
export type UpdateOrderDTO = { title?: string, description?: string, orderId: string };

const token = localStorage.getItem('accessToken');

const api = axios.create({
  baseURL: 'https://dzen-code-app-be.vercel.app/orders',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

export const fetchOrders = async ({ query }:{ query?: string }) => {
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

export const getOrderById = async (id: string) => {
  return await api.get(`/${id}`);
}

export const createOrder = async (createOrderDTO: CreateOrderDTO) => {
  return await api.post('/', createOrderDTO);
}

export const updateOrder = async (updateOrderDTO: UpdateOrderDTO) => {
  const { orderId, ...body } = updateOrderDTO;
  return await api.patch(`/${updateOrderDTO.orderId}`, body);
}

export const deleteOrder = async (id: string) => {
  return await api.delete(`/${id}`);
}
