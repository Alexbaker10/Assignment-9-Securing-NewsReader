import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password, role = 'regular') => {
    const userData = { username, role, token: `mock_token_${Date.now()}` };
    setUser(userData);
    return userData;
  };

  const logout = () => setUser(null);

  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}