// src/context/ActiveSectionContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ActiveSectionContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const ActiveSectionContext = createContext<ActiveSectionContextType>({
  activeSection: '',
  setActiveSection: () => {},
});

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState('');

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}
