import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api/api';
import { authApi } from '../services/api/auth'
import { usersApi } from '../services/api/users'

type User = {
  name: string | null
  email: string | null
  role: string | null
  token: string | null
}

interface AuthContextValue {
  signed: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void> | void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
  signed: false
})

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = function({children}: Props) {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      return
    }
    if(user.role == 'admin') {
      navigate('atendimentos')
    } else {
      navigate('novo-atendimento')
    }
  }, [user])

  useEffect(() => {
    if(localStorage.getItem('@App:name')&&
      localStorage.getItem('@App:email') &&
      localStorage.getItem('@App:role') &&
      localStorage.getItem('@App:token') 
    ) {
      setUser({
        name: localStorage.getItem('@App:name'),
        email: localStorage.getItem('@App:email'),
        role: localStorage.getItem('@App:role'),
        token: localStorage.getItem('@App:token'),
      })
      
      api.defaults.headers.Authorization = `Bearer ${localStorage.getItem('@App:token')}`
    }
  }, [])

  async function login(email: string, password: string) {
    return authApi.login(
      email,
      password
    )
    .then(async res => {
      const { access_token: token } = res.data

      api.defaults.headers.Authorization = `Bearer ${token}`

      localStorage.setItem('@App:token', token)
      await getUserInfo()
    })
  }

  async function logout() {
    setUser(null)
    localStorage.removeItem('@App:name')
    localStorage.removeItem('@App:email')
    localStorage.removeItem('@App:role')
    localStorage.removeItem('@App:token')
    navigate('/')
  }

  async function getUserInfo() {
    const res = await usersApi.getInfo()
    const { name, email, role } = await res.data

    const token = localStorage.getItem('@App:token')

    setUser({
      name,
      email,
      role,
      token
    })

    if(res.status == 200) {
      localStorage.setItem('@App:name', name)
      localStorage.setItem('@App:email', email)
      localStorage.setItem('@App:role', role)
    }
  }

  return (
    <AuthContext.Provider 
      value={{ signed: Boolean(user), user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}