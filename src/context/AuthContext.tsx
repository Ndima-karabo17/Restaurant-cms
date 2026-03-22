import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { apiClient } from '../api/client';
import type { User, AuthContextType } from '../types/Authtypes';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('cms_token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const res = await apiClient.get('/auth/profile');
          setUser(res.data as User);
        } catch (err: unknown) {
          console.warn('Session restore failed:', err);
          localStorage.removeItem('cms_token');
        }
      }
      setLoading(false);
    };
    restoreSession();
  }, []);

  const signin = async (email: string, password: string) => {
    const res = await apiClient.post('/signin', { email, password });
    const { token: newToken, user: newUser } = res.data as { token: string; user: User };

    localStorage.setItem('cms_token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const signout = () => {
    localStorage.removeItem('cms_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signin, signout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };