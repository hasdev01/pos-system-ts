import React, { createContext, useContext, useState } from 'react'

export type UserRole = 'Admin' | 'Manager' | 'Cashier'

export interface AuthUser {
  name: string
  email: string
  role: UserRole
  avatar: string
  store: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (role: UserRole) => void
  logout: () => void
}

const ROLE_PROFILES: Record<UserRole, AuthUser> = {
  Admin: {
    name: 'Admin User',
    email: 'admin@store.pk',
    role: 'Admin',
    avatar: 'AU',
    store: 'Al-Amin Store',
  },
  Manager: {
    name: 'Faisal Mirza',
    email: 'faisal@store.pk',
    role: 'Manager',
    avatar: 'FM',
    store: 'Al-Amin Store',
  },
  Cashier: {
    name: 'Ahmed Ali',
    email: 'ahmed@store.pk',
    role: 'Cashier',
    avatar: 'AA',
    store: 'Al-Amin Store',
  },
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [user, setUser] = useState<AuthUser | null>(null)

  const login = (role: UserRole): void => {
    setUser(ROLE_PROFILES[role])
  }

  const logout = (): void => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
