import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { FORMATION_URL } from '../constants/contact.js';

export const LOGIN_PATH = '/connexion';

// Accès à la formation : réservé aux utilisateurs connectés. Sans session,
// on redirige vers la page de connexion avec l'URL de retour en paramètre.
export function useFormationAccess() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const openFormation = useCallback(() => {
    if (user) {
      window.location.href = FORMATION_URL;
      return;
    }
    navigate(`${LOGIN_PATH}?redirect=${encodeURIComponent(FORMATION_URL)}`);
  }, [navigate, user]);

  return { openFormation, isAuthed: Boolean(user) };
}
