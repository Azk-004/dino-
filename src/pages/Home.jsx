import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BoulevardScene from "../components/three/BoulevardScene.jsx";
import { getLesson, questionnaire } from "../data/curriculum.js";
import { useTheme } from "../context/ThemeContext.jsx";
import { useMode } from "../context/ModeContext.jsx";

gsap.registerPlugin(ScrollTrigger);

const STEPS = getLesson("l3").content.find((b) => b.type === "steps").items;

const ACCENTS = ["#b4552d", "#5f7a5a", "#7a2f33", "#b08d2e", "#a06a35", "#8a6d2a", "#6f5a2f"];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Home() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const progressRef = useRef(0);
  const stepsWrap = useRef(null);
  const stepsTrack = useRef(null);
  const { theme } = useTheme();
  const { mode, meta, introOpen } = useMode();

  /* Caméra du boulevard pilotée par le scroll du hero */
  useEffect(() => {
    const hero = heroRef.current;
    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    /* Révélations au scroll */
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%" },
          }
        );
      });
    }, rootRef);

    return () => {
      st.kill();
      ctx.revert();
    };
  }, []);

  /* Parcours en 7 étapes : scroll horizontal épinglé */
  useEffect(() => {
    const wrap = stepsWrap.current;
    const track = stepsTrack.current;
    if (!wrap || !track) return;

    const getAmount = () => Math.max(track.scrollWidth - window.innerWidth, 0);
    const tween = gsap.to(track, {
      x: () => -getAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: () => `+=${getAmount()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
    return () => {
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* ================= HERO ================= */}
      <section ref={heroRef} className="hero">
        <div className="hero-canvas">
          {mode === "atelier" && !introOpen ? (
            <BoulevardScene progressRef={progressRef} />
          ) : (
            <div className="hero-mode-tag" style={{ "--tag-accent": meta.accent }}>
              <span className="hero-mode-tag-top mono">{meta.num} — {meta.name.toUpperCase()}</span>
              <span className="hero-mode-tag-hint mono">✦ {meta.interact}</span>
            </div>
          )}
        </div>

        <div className="hero-scrim" />

        <div className="hero-content">
          <motion.div
            className="hero-kicker mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            FORMATION EN LIGNE · MODULE 1 — DOMAINE PUBLIC
            <span className="blink">_</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } } }}
          >
            {"PANNEAUTIQUE".split("").map((ch, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 90, rotateX: 40 },
                  show: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="hero-letter"
              >
                {ch}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
          >
            Le métier qui éclaire les Villes. De l'audit à la gestion des régies
            publicitaires — découvrez l'exploitation des panneaux publicitaires
            en espace public, à travers sept univers d'apprentissage.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.35 }}
          >
            <Link to="/lecon/l1" className="btn btn-primary">
              <span>Commencer la formation</span>
            </Link>
            <Link to="/revision" className="btn btn-ghost">
              <span>Mode révision</span>
            </Link>
          </motion.div>

          <motion.div
            className="hero-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <span className="mono">
              {theme === "night"
                ? "La nuit — activez le mode jour pour voir la Ville s'éveiller"
                : "Le jour — repassez en nuit pour rallumer les panneaux"}
            </span>
            <div className="scroll-mouse">
              <span />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= LE MÉTIER ================= */}
      <section className="section section-intro">
        <div className="container">
          <div className="section-head reveal">
            <span className="kicker mono">LE MÉTIER</span>
            <h2>
              La panneautique, un <em>corps de métier</em> pluridisciplinaire
            </h2>
            <p className="lead">
              Installer et gérer les panneaux publicitaires, c'est orchestrer
              concurrence, embellissement urbain et réglementation. Quatre
              chapitres pour maîtriser l'ensemble du processus.
            </p>
          </div>

          <div className="card-grid">
            {[
              {
                n: "01",
                title: "Introduction & constat",
                text: "L'importance socio-économique du panneau publicitaire et le constat de la pollution visuelle quand le secteur n'est pas encadré.",
                to: "/lecon/l1",
                accent: "#b4552d",
              },
              {
                n: "02",
                title: "Les 7 étapes de la réorganisation",
                text: "De l'audit à la gestion des régies : audit, état des lieux, zonage, lots, concession, attribution, régies.",
                to: "/lecon/l3",
                accent: "#7a2f33",
              },
              {
                n: "03",
                title: "Évaluation & mise à jour",
                text: "Un mécanisme d'évaluation soutenable et une mise à jour continue pour pérenniser un secteur en phase avec l'urbanisation.",
                to: "/lecon/l4",
                accent: "#b08d2e",
              },
            ].map((c, i) => (
              <Link
                key={c.n}
                to={c.to}
                className="card reveal"
                style={{ "--card-accent": c.accent }}
              >
                <span className="card-num mono">{c.n}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="card-link">Explorer →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PARCOURS 7 ÉTAPES ================= */}
      <section ref={stepsWrap} className="steps-section">
        <div ref={stepsTrack} className="steps-track">
          <div className="steps-intro">
            <span className="kicker mono">LE PARCOURS</span>
            <h2>
              Sept panneaux, <em>sept étapes</em>
            </h2>
            <p>
              Faites défiler : la caméra suit le parcours, panneau après
              panneau, de l'audit à la gestion des régies.
            </p>
            <span className="mono steps-scroll">SCROLL →</span>
          </div>

          {STEPS.map((s, i) => (
            <div key={s.n} className="step-card" style={{ "--step-accent": ACCENTS[i % ACCENTS.length] }}>
              <span className="step-num mono">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <Link to="/lecon/l3" className="step-link mono">
                VOIR LA LEÇON →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DÉFINITIONS ================= */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="kicker mono">VOCABULAIRE</span>
            <h2>
              Cinq termes, <em>un seul métier</em>
            </h2>
          </div>
          <div className="term-grid">
            {questionnaire.definitions.map((d, i) => (
              <div key={d.id} className="term-chip reveal" style={{ "--chip-delay": i * 0.06 }}>
                <span className="mono term-index">0{i + 1}</span>
                <span className="term-name">{d.term}</span>
              </div>
            ))}
          </div>
          <div className="section-cta reveal">
            <p>
              Testez votre mémoire avec le mode révision : texte à trous et
              cartes flash.
            </p>
            <Link to="/revision" className="btn btn-primary">
              <span>Ouvrir le mode révision</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= QUIZ CTA ================= */}
      <section className="section section-quiz">
        <div className="container quiz-cta reveal">
          <div className="quiz-cta-inner">
            <span className="kicker mono">QUESTIONNAIRE DU MODULE</span>
            <h2>
              10 QCM <span className="mono">+</span> 7 questions ouvertes
            </h2>
            <p>
              Feedback immédiat, score de progression, possibilité de refaire le
              quiz à volonté.
            </p>
            <Link to="/quiz" className="btn btn-primary">
              <span>Passer le quiz</span>
            </Link>
          </div>
          <div className="quiz-score-preview">
            <span className="mono">MEILLEUR SCORE</span>
            <div className="score-ring">—</div>
            <span className="mono small">À DÉFIER</span>
          </div>
        </div>
      </section>
    </div>
  );
}
