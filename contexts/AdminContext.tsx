'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type AdminData = {
  id: string
  username: string
  role: string
}

type AdminContextType = {
  admin: AdminData | null
  setAdmin: (admin: AdminData | null) => void
  isLoading: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin_data')
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin))
      } catch (err) {
        console.error('Failed to parse admin data:', err)
        localStorage.removeItem('admin_data')
      }
    }
    setIsLoading(false)
  }, [])

  return (
    <AdminContext.Provider value={{ admin, setAdmin, isLoading }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

