export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  tags: string[];
  category: string;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  image: string;
}