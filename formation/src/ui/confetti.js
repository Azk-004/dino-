// Petite pluie de confettis aux couleurs du site quand la formation est validée.
const CONFETTI_COLORS = ["#c08a68", "#cfa574", "#9db87f", "#8a9ab8", "#d2a678", "#e0c9a0"];
let confettiLayer = null;

export function celebrate() {
  if (!confettiLayer) {
    confettiLayer = document.createElement("div");
    confettiLayer.id = "confetti-layer";
    document.body.appendChild(confettiLayer);
  }
  const count = 110;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "confetti-piece" + (Math.random() < 0.3 ? " circle" : "");
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0];
    p.style.opacity = (0.55 + Math.random() * 0.45).toFixed(2);
    const dur = 2.4 + Math.random() * 2.2;
    const delay = Math.random() * 0.9;
    p.style.animation = `confettiFall ${dur}s cubic-bezier(0.2, 0.6, 0.4, 1) ${delay}s forwards`;
    confettiLayer.appendChild(p);
    setTimeout(() => p.remove(), (dur + delay + 0.2) * 1000);
  }
  setTimeout(() => {
    if (confettiLayer && !confettiLayer.childElementCount) confettiLayer.remove();
  }, 6200);
}

export function formatDateFr(d) {
  try {
    return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(d);
  } catch {
    return d.toLocaleDateString("fr-FR");
  }
}
