import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { locations as locationData } from '../data/hrmsData'

export type AppModule = 'pos' | 'hrms' | 'erp'

interface ModuleContextType {
  module: AppModule
  setModule: (m: AppModule) => void
  locationCode: string
  setLocationCode: (c: string) => void
  availableLocations: { code: string; name: string }[]
}

const ModuleContext = createContext<ModuleContextType | null>(null)

const STORAGE_MODULE = 'app.module'
const STORAGE_LOC    = 'app.location'

function detectModule(pathname: string): AppModule {
  if (pathname.startsWith('/hrms')) return 'hrms'
  if (pathname.startsWith('/erp'))  return 'erp'
  return 'pos'
}

export function ModuleProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [module, setModuleState] = useState<AppModule>(() => {
    if (typeof window === 'undefined') return 'pos'
    const fromPath = detectModule(window.location.pathname)
    return (localStorage.getItem(STORAGE_MODULE) as AppModule) || fromPath
  })

  const [locationCode, setLocationCodeState] = useState<string>(() => {
    if (typeof window === 'undefined') return 'KHI-01'
    return localStorage.getItem(STORAGE_LOC) || 'KHI-01'
  })

  const setModule = (m: AppModule): void => {
    setModuleState(m)
    try { localStorage.setItem(STORAGE_MODULE, m) } catch { /* ignore */ }
  }
  const setLocationCode = (c: string): void => {
    setLocationCodeState(c)
    try { localStorage.setItem(STORAGE_LOC, c) } catch { /* ignore */ }
  }

  useEffect(() => {
    const onPop = (): void => setModuleState(detectModule(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const availableLocations = useMemo(
    () => [{ code: 'ALL', name: 'All Locations' }, ...locationData.map(l => ({ code: l.code, name: l.name }))],
    []
  )

  return (
    <ModuleContext.Provider value={{ module, setModule, locationCode, setLocationCode, availableLocations }}>
      {children}
    </ModuleContext.Provider>
  )
}

export function useModule(): ModuleContextType {
  const ctx = useContext(ModuleContext)
  if (!ctx) throw new Error('useModule must be used inside ModuleProvider')
  return ctx
}
