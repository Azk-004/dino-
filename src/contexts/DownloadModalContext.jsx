import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import AppUnavailableModal from '../components/ui/AppUnavailableModal.jsx';

const DownloadModalContext = createContext(null);

export function DownloadModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openDownloadModal = useCallback(() => setOpen(true), []);
  const closeDownloadModal = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openDownloadModal }), [openDownloadModal]);

  return (
    <DownloadModalContext.Provider value={value}>
      {children}
      <AppUnavailableModal open={open} onClose={closeDownloadModal} />
    </DownloadModalContext.Provider>
  );
}

export function useDownloadModal() {
  const ctx = useContext(DownloadModalContext);
  if (!ctx) {
    throw new Error('useDownloadModal must be used within DownloadModalProvider');
  }
  return ctx;
}
