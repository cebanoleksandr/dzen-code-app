import axios from 'axios';

export type CreateProductDTO = {
  serialNumber: number;
  status: 'In stock' | 'Under repair' | 'Out of stock';
  photo: string;
  title: string;
  type: 'New' | 'Used';
  specification: string;
  guarantee: {
    start: Date;
    end: Date;
  },
  price: { value: number, symbol: 'USD' | 'UAH', isDefault: number }[];
  order: string;
  authorId: string;
}

export type UpdateProductDTO = { 
  photo?: string;
  title?: string;
  type?: string;
  specification?: string; 
  guarantee?: {
    start: Date;
    end: Date;
  },
  price?: { value: number, symbol: 'USD' | 'UAH', isDefault: number }[];
  order: number;
}

const api = axios.create({
  baseURL: 'https://dzen-code-app-be.vercel.app/products',
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchProducts = async ({ orderId, query }:{ orderId?: string, query?: string }) => {
  let url = '';
  const queryParams = new URLSearchParams();

  if (orderId) {
    queryParams.append('orderId', orderId);
  }

  if (query) {
    queryParams.append('query', query);
  }

  const queryString = queryParams.toString();

  if (queryString) {
    url = `?${queryString}`;
  } else {
    url = '/';
  }

  console.log('URL: ', url)

  return await api.get(url);
}

export const getProductById = async (id: string) => {
  return await api.get(`/${id}`);
}

export const createProduct = async (createProductDTO: CreateProductDTO) => {
  return await api.post('/', createProductDTO);
}

export const updateProduct = async (updateProductDTO: UpdateProductDTO) => {
  const { order, ...body } = updateProductDTO;
  return await api.patch(`/${updateProductDTO.order}`, body);
}

export const deleteProduct = async (id: string) => {
  return await api.delete(`/${id}`);
}
