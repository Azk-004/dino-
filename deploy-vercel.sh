#!/usr/bin/env bash
# ============================================================================
# deploy-vercel.sh — Déploie le frontend Panneautique sur Vercel (production)
# et injecte automatiquement les variables Supabase depuis le .env local.
#
# Prérequis (une seule fois) : être connecté à Vercel depuis cette machine :
#     npx vercel login
#
# Usage :
#     bash deploy-vercel.sh
# ============================================================================
set -uo pipefail
cd "$(dirname "$0")"

SUPABASE_URL=$(grep '^VITE_SUPABASE_URL=' .env 2>/dev/null | head -1 | cut -d= -f2- | tr -d '\r')
SUPABASE_KEY=$(grep '^VITE_SUPABASE_ANON_KEY=' .env 2>/dev/null | head -1 | cut -d= -f2- | tr -d '\r')

if [ -z "$SUPABASE_URL" ]; then echo "✗ VITE_SUPABASE_URL introuvable dans .env"; exit 1; fi
if [ -z "$SUPABASE_KEY" ]; then echo "✗ VITE_SUPABASE_ANON_KEY introuvable dans .env"; exit 1; fi

echo "== 1/4 Connexion Vercel =="
if ! npx --yes vercel@latest whoami >/dev/null 2>&1; then
  echo "Tu n'es pas connecté à Vercel sur cette machine. Connecte-toi une fois :"
  echo "    npx vercel login"
  exit 1
fi
echo "   Connecté ✅"

echo "== 2/4 Premier déploiement (lie le projet) =="
npx --yes vercel@latest --prod --yes || exit 1
echo "   Projet lié ✅"

echo "== 3/4 Variables Supabase (production + preview) =="
for envname in production preview; do
  if echo "$SUPABASE_URL" | npx --yes vercel@latest env add VITE_SUPABASE_URL "$envname" --force >/dev/null 2>&1; then
    echo "   VITE_SUPABASE_URL ($envname) ✅"
  else
    echo "   ⚠ VITE_SUPABASE_URL ($envname) : ajoute-la dans Vercel → Settings → Environment Variables"
  fi
  if echo "$SUPABASE_KEY" | npx --yes vercel@latest env add VITE_SUPABASE_ANON_KEY "$envname" --force >/dev/null 2>&1; then
    echo "   VITE_SUPABASE_ANON_KEY ($envname) ✅"
  else
    echo "   ⚠ VITE_SUPABASE_ANON_KEY ($envname) : ajoute-la dans Vercel → Settings → Environment Variables"
  fi
done

echo "== 4/4 Déploiement final (avec les variables) =="
npx --yes vercel@latest --prod --yes || exit 1

echo
echo "Déploiement terminé ✅ — l'URL de production s'affiche ci-dessus."
echo "L'écran de connexion doit maintenant apparaître au chargement du site."
