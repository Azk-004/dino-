import { useEffect, useState } from 'react';
import { Loader2, Send, CheckCircle2, FileSearch } from 'lucide-react';
import Reveal from '../../../components/ui/Reveal.jsx';
import ChapterHeading from '../../../components/ui/ChapterHeading.jsx';
import {
  CONTACT_EMAIL,
  FORMSUBMIT_ENDPOINT,
  CONSULTATION_SUBJECT,
} from '../../../constants/contact.js';

const INITIAL = {
  name: '',
  email: '',
  city: '',
  studyType: '',
  message: '',
  _honey: '',
};

const studyTypes = [
  'Étude sur la panneautique.',
  'Réformes dans le secteur d\'exploitation des panneaux publicitaires.',
  'État des lieux du secteur/ Cartographie.',
  'Études de marchés/ Valorisation des supports.',
  'Autres besoins relatifs au secteur d\'exploitation des panneaux publicitaires.',
];

export default function Consultation() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle');

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (form._honey) return;

    setStatus('loading');
    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: CONSULTATION_SUBJECT,
          _template: 'table',
          _captcha: 'false',
          _replyto: form.email,
          'Nom et prénom': form.name.trim(),
          Email: form.email.trim(),
          Ville: form.city.trim(),
          'Type de demande': form.studyType,
          Message: form.message.trim(),
        }),
      });

      if (!response.ok) throw new Error('Une erreur est survenue lors de l’envoi.');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(() => setForm(INITIAL), 100);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [status]);

  return (
    <section
      id="consultation"
      className="perspective-section act-scrim act-scrim--soft relative scroll-mt-16 py-24 lg:py-32"
    >
      <div className="mx-4 sm:mx-8 lg:mx-[12%]">
        <ChapterHeading
          number={6}
          total={9}
          kicker="Consultation"
          title="Commandez votre étude sur la panneautique."
          lede="Pour tous vos besoins relatifs au secteur d'exploitation des panneaux publicitaires, veuillez nous contacter à l'adresse : contact@panotik.site. Nous reviendrons vers vous le plus rapidement possible."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-3xl border border-night-border bg-night-soft/70 p-8 backdrop-blur-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary-light">
                <FileSearch className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-cream">
                Ce que nous traitons
              </h3>
              <ul className="mt-5 space-y-3 text-base leading-relaxed text-mist/85">
                {studyTypes.map((type) => (
                  <li key={type} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {type}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-sm text-mist/70">
                Une question plus simple ? Écrivez-nous directement à {CONTACT_EMAIL}.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl border border-night-border bg-night-soft/70 p-8 backdrop-blur-sm"
            >
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

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-cream">Nom et prénom</span>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    required
                    autoComplete="name"
                    disabled={status === 'loading'}
                    className="mt-1.5 w-full rounded-2xl border border-night-border bg-night/80 px-4 py-3.5 text-base text-cream outline-none transition-colors placeholder:text-mist/40 focus:border-primary disabled:opacity-60"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-cream">Email</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    autoComplete="email"
                    disabled={status === 'loading'}
                    className="mt-1.5 w-full rounded-2xl border border-night-border bg-night/80 px-4 py-3.5 text-base text-cream outline-none transition-colors placeholder:text-mist/40 focus:border-primary disabled:opacity-60"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-bold text-cream">Ville concernée</span>
                  <input
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={onChange}
                    required
                    autoComplete="address-level2"
                    placeholder="Ex. Cotonou, Abidjan…"
                    disabled={status === 'loading'}
                    className="mt-1.5 w-full rounded-2xl border border-night-border bg-night/80 px-4 py-3.5 text-base text-cream outline-none transition-colors placeholder:text-mist/40 focus:border-primary disabled:opacity-60"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-bold text-cream">Type de demande</span>
                  <select
                    name="studyType"
                    value={form.studyType}
                    onChange={onChange}
                    required
                    disabled={status === 'loading'}
                    className="mt-1.5 w-full rounded-2xl border border-night-border bg-night/80 px-4 py-3.5 text-base text-cream outline-none transition-colors focus:border-primary disabled:opacity-60"
                  >
                    <option value="" disabled>
                      Sélectionnez le type d'étude…
                    </option>
                    {studyTypes.map((type) => (
                      <option key={type} value={type} className="bg-night text-cream">
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-bold text-cream">Votre besoin</span>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={onChange}
                    required
                    disabled={status === 'loading'}
                    placeholder="Décrivez votre projet : cartographie, conformité, réforme, valorisation…"
                    className="mt-1.5 w-full resize-y rounded-2xl border border-night-border bg-night/80 px-4 py-3.5 text-base text-cream outline-none transition-colors placeholder:text-mist/40 focus:border-primary disabled:opacity-60"
                  />
                </label>
              </div>

              {status === 'error' && (
                <p className="mt-4 text-sm text-error" role="alert">
                  Impossible d'envoyer votre demande. Réessayez ou écrivez-nous à {CONTACT_EMAIL}.
                </p>
              )}

              {status === 'success' ? (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-success/40 bg-success/10 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-cream">
                    Merci - votre demande de consultation a bien été envoyée. Nous revenons vers
                    vous dès que possible.
                  </p>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-bold text-night transition-all duration-300 hover:-translate-y-0.5 hover:bg-glow hover:shadow-[0_0_20px_rgba(243,207,148,0.5)] disabled:cursor-wait disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" aria-hidden="true" />
                      Envoyer ma demande d'étude
                    </>
                  )}
                </button>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
