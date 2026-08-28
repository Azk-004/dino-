import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import InscriptionModal from '../components/ui/InscriptionModal.jsx';

const InscriptionModalContext = createContext(null);

export function InscriptionModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openInscriptionModal = useCallback(() => setOpen(true), []);
  const closeInscriptionModal = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openInscriptionModal }), [openInscriptionModal]);

  return (
    <InscriptionModalContext.Provider value={value}>
      {children}
      <InscriptionModal open={open} onClose={closeInscriptionModal} />
    </InscriptionModalContext.Provider>
  );
}

export function useInscriptionModal() {
  const ctx = useContext(InscriptionModalContext);
  if (!ctx) {
    throw new Error('useInscriptionModal must be used within InscriptionModalProvider');
  }
  return ctx;
}
