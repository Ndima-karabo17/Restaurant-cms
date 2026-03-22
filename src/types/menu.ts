export interface MenuItem {
  id: number | string;
  name: string;
  price: number | string;
  category: string;
  description: string;
  image_url?: string;
}

export interface MenuFormState {
  name: string;
  price: string;
  description: string;
  category: string;
  image_url: string;
}