import Reveal from '../ui/Reveal.jsx';
import { CONTACT_EMAIL, CONTACT_MAILTO } from '../../constants/contact.js';

const columns = [
  {
    title: 'Produit',
    links: [
      { label: 'aanid', href: '#aanid' },
      { label: 'Fonctionnalités', href: '#fonctionnalites' },
      { label: 'Formation & tarifs', href: '#tarifs' },
      { label: 'Pour qui ?', href: '#publics' },
    ],
  },
  {
    title: 'Société',
    links: [
      { label: 'À propos de Panotik', href: '/a-propos' },
      { label: 'Contact', href: CONTACT_MAILTO },
      { label: 'Consultation & études', href: '#consultation' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Conditions générales', href: '/cgu' },
      { label: 'Confidentialité', href: '/confidentialite' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-night-border bg-night">
      <Reveal className="mx-4 py-12 sm:mx-8 lg:mx-[12%]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-2xl font-extrabold tracking-tight text-cream">Panotik</p>
            <p className="mt-1 text-sm font-extrabold italic lowercase text-mist/70">aanid</p>
            <p className="mt-4 text-sm leading-relaxed text-mist/70">
              Panotik édite aanid, l&apos;application de gestion ; véritable outil de
              rayonnement de la panneautique urbaine.
            </p>
            <a
              href={CONTACT_MAILTO}
              className="mt-4 inline-block text-sm text-mist/80 transition-colors hover:text-primary-light"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-extrabold text-cream">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-mist/70 transition-colors hover:text-primary-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-night-border pt-6 text-center text-sm text-mist/60">
          © {new Date().getFullYear()} Panotik. Tous droits réservés.
        </div>
      </Reveal>
    </footer>
  );
}
