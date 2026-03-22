export interface User {
  id: number;
  email: string;
  address?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
  loading: boolean;
}