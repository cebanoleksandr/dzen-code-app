export type Order = {
  _id: string;
  id: string;
  title: string;
  description: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export type Product = {
  _id: string;
  id: string;
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
  createdAt: string;
  updatedAt: string;
}

export type User = {
  _id: string;
  id: string;
  email: string;
  firstName: null | string;
  lastName: null | string;
  photoUrl: null | string;
  updatedAt: string;
  createdAt: string;
}

export type AuthData = {
  accessToken: string;
  user: User;
}
