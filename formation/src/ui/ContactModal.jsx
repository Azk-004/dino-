import { useEffect, useRef, useState } from "react";
import { db } from "../lib/local.js";

// Formulaire de contact (#ui-contact) : enregistré via db.sendContact (Supabase
// ou simulation locale si non configurée). Port React de l'ancien ui.js.
export default function ContactModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ text: "", kind: "" });
  const nameRef = useRef(null);

  useEffect(() => {
    if (open) {
      setStatus({ text: "", kind: "" });
      setTimeout(() => nameRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e) => {
    e.preventDefault();
    if (sending) return;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ text: "Merci de remplir tous les champs.", kind: "err" });
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setStatus({ text: "L'adresse email semble incorrecte.", kind: "err" });
      return;
    }
    setSending(true);
    setStatus({ text: "Envoi en cours…", kind: "" });
    db.sendContact({ name: name.trim(), email: email.trim(), message: message.trim() }).then((sent) => {
      setSending(false);
      if (sent || !db.configured) {
        setStatus({ text: "Merci, votre message est bien parti.", kind: "ok" });
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(onClose, 2200);
      } else {
        setStatus({ text: "L'envoi a échoué, veuillez réessayer dans un instant.", kind: "err" });
      }
    });
  };

  return (
    <div id="ui-contact" className={"contact-wrap" + (open ? " show" : "")} aria-hidden={!open} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="contact-panel" data-lenis-prevent>
        <button id="contact-close" className="contact-close" aria-label="Fermer" onClick={onClose}>×</button>
        <div className="contact-kicker">Une question, une remarque ?</div>
        <h2 className="contact-title">Écrivez-nous.</h2>
        <div className="contact-rule"></div>
        <form id="contact-form" className="contact-form" noValidate onSubmit={submit}>
          <label className="contact-field">
            <span>Nom</span>
            <input id="contact-name" name="name" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} ref={nameRef} />
          </label>
          <label className="contact-field">
            <span>Email</span>
            <input id="contact-email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="contact-field">
            <span>Message</span>
            <textarea id="contact-message" name="message" rows="4" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          </label>
          <button type="submit" className="contact-submit">Envoyer</button>
          <div id="contact-status" className={"contact-status" + (status.kind ? " " + status.kind : "")} role="status">
            {status.text}
          </div>
        </form>
      </div>
    </div>
  );
}
