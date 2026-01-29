export interface MenuItem {
  id: number | string;
  name: string;
  price: number;
  image_url: string; 
  description: string;
  category: string;
}

export interface MenuFormState {
  name: string;
  price: string;
  image_url: string; 
  description: string;
  category: string;
}
