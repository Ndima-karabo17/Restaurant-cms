export interface MenuItem {
  id: number | string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface MenuFormState {
  name: string;
  price: string;
  description: string;
  category: string;
}