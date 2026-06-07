import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem('scf_token'))

  const login = (t) => { setToken(t); sessionStorage.setItem('scf_token', t) }
  const logout = () => { setToken(null); sessionStorage.removeItem('scf_token') }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)