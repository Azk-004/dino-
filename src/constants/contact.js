export const CONTACT_EMAIL = 'contact@panotik.site';

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

/** FormSubmit AJAX endpoint - first submission triggers a confirmation email to activate. */
export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export const INSCRIPTION_SUBJECT = 'Nouvelle inscription - formation panneautique';

export const CONSULTATION_SUBJECT = 'Nouvelle demande de consultation - panneautique';

/** Chemin de la formation interactive (intégrée dans public/formation). */
export const FORMATION_URL = '/formation';
