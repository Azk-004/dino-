import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

let sessionId = null;

function getSessionId() {
  if (sessionId) return sessionId;
  try {
    sessionId = sessionStorage.getItem('panotik-session-id');
    if (!sessionId) {
      sessionId = crypto.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2);
      sessionStorage.setItem('panotik-session-id', sessionId);
    }
  } catch {
    sessionId = 'fallback-' + Date.now();
  }
  return sessionId;
}

/**
 * Enregistre un événement analytics dans Supabase.
 * Silencieux : ne bloque jamais l'interface, log en console en cas d'erreur.
 */
export async function trackEvent(eventType, { path, element, metadata, userId } = {}) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from('analytics_events').insert({
      event_type: eventType,
      path: path || window.location.pathname,
      element: element || null,
      metadata: metadata || {},
      user_id: userId || null,
      session_id: getSessionId(),
    });
  } catch (err) {
    console.warn('[analytics]', import.meta.env.DEV ? err.message : 'Erreur interne');
  }
}

/**
 * Hook : track les changements de route (page_view).
 */
export function usePageTracking(userId) {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;
    trackEvent('page_view', { path: location.pathname, userId });
  }, [location.pathname, userId]);
}

/**
 * Hook : retourne un callback `trackClick` à attacher aux éléments.
 */
export function useClickTracking(userId) {
  const trackClick = useCallback(
    (elementName, metadata) => {
      trackEvent('click', { element: elementName, metadata, userId });
    },
    [userId]
  );
  return trackClick;
}
