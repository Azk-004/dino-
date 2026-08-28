import { useEffect, useState } from 'react';
import { Loader2, Send, X } from 'lucide-react';
import {
  CONTACT_EMAIL,
  FORMSUBMIT_ENDPOINT,
  INSCRIPTION_SUBJECT,
} from '../../constants/contact.js';
import { startLenis, stopLenis } from '../../hooks/useLenis.js';

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  city: '',
  profession: '',
  _honey: '',
};

const fields = [
  {
    name: 'name',
    label: 'Nom et prénom',
    type: 'text',
    autoComplete: 'name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
    required: true,
  },
  {
    name: 'phone',
    label: 'Téléphone',
    type: 'tel',
    autoComplete: 'tel',
    required: true,
  },
  {
    name: 'city',
    label: 'Ville',
    type: 'text',
    autoComplete: 'address-level2',
    required: true,
  },
  {
    name: 'profession',
    label: 'Profession / rôle',
    type: 'text',
    autoComplete: 'organization-title',
    required: true,
    placeholder: 'Ex. citoyen, professionnel, formateur…',
  },
];

export default function InscriptionModal({ open, onClose }) {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!open) return undefined;

    stopLenis();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      startLenis();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape' && status !== 'loading') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, status]);

  useEffect(() => {
    if (!open) {
      setForm(INITIAL);
      setStatus('idle');
      setErrorMessage('');
    }
  }, [open]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (form._honey) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: INSCRIPTION_SUBJECT,
          _template: 'table',
          _captcha: 'true',
          _replyto: form.email,
          'Nom et prénom': form.name.trim(),
          Email: form.email.trim(),
          Téléphone: form.phone.trim(),
          Ville: form.city.trim(),
          'Profession / rôle': form.profession.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de l’envoi.');
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage(
        `Impossible d’envoyer le formulaire. Réessayez ou écrivez-nous à ${CONTACT_EMAIL}.`,
      );
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
        aria-label="Fermer la fenêtre"
        onClick={status === 'loading' ? undefined : onClose}
        disabled={status === 'loading'}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inscription-title"
        data-lenis-prevent
        className="relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col rounded-t-3xl border border-night-border bg-night-soft shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:rounded-3xl"
      >
        <div className="relative shrink-0 border-b border-night-border px-6 pb-4 pt-6 sm:px-8 sm:pt-8">
          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-mist transition-colors hover:bg-white/10 hover:text-cream disabled:opacity-40"
            onClick={onClose}
            disabled={status === 'loading'}
            aria-label="Fermer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary-light">
            Formation
          </p>
          <h2
            id="inscription-title"
            className="mt-3 pr-10 text-2xl font-extrabold tracking-tight text-cream"
          >
            S&apos;inscrire à la formation
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mist/90">
            Remplissez vos informations. Nous les recevrons à {CONTACT_EMAIL} et
            vous recontacterons rapidement.
          </p>
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5 sm:px-8"
          data-lenis-prevent
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {status === 'success' ? (
            <div>
              <p className="text-base leading-relaxed text-cream">
                Merci - votre demande d&apos;inscription a bien été envoyée.
              </p>
              <p className="mt-2 text-sm text-mist/80">
                Nous revenons vers vous dès que possible.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-base font-bold text-night transition-colors hover:bg-glow"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form className="space-y-4 pb-2" onSubmit={onSubmit} noValidate>
              {/* Honeypot anti-spam */}
              <input
                type="text"
                name="_honey"
                value={form._honey}
                onChange={onChange}
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              {fields.map((field) => (
                <label key={field.name} className="block">
                  <span className="text-sm font-bold text-cream">{field.label}</span>
                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={onChange}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    disabled={status === 'loading'}
                    className="mt-1.5 w-full rounded-2xl border border-night-border bg-night/80 px-4 py-3.5 text-base text-cream outline-none transition-colors placeholder:text-mist/40 focus:border-primary disabled:opacity-60"
                  />
                </label>
              ))}

              {status === 'error' && (
                <p className="text-sm text-error" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-bold text-night transition-colors hover:bg-glow disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" aria-hidden="true" />
                    Envoyer ma demande
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
