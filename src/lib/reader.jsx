/**
 * Helpers partagés pour les LECTEURS DE MODE (Atelier, Archives,
 * Observatoire, Panorama). Chaque mode présente les blocs du cours avec une
 * expérience de lecture différente, mais ils partagent ces utilitaires.
 */

/* ------------------------------------------------------------------ */
/* Surlignage — extrait de Lesson.jsx pour être réutilisé par les      */
/* lecteurs de mode (chaque bloc rendu garde ses marks + data-block).  */
/* ------------------------------------------------------------------ */
export function renderSegments(text, ranges, onMarkClick) {
  if (!ranges.length) return text;
  const sorted = [...ranges].sort((a, b) => a.start - b.start || a.end - b.end);
  const merged = [];
  for (const r of sorted) {
    const last = merged[merged.length - 1];
    if (last && r.start <= last.end) last.end = Math.max(last.end, r.end);
    else merged.push({ ...r });
  }
  const nodes = [];
  let cursor = 0;
  merged.forEach((r) => {
    if (r.start > cursor) nodes.push(text.slice(cursor, r.start));
    nodes.push(
      <mark
        key={r.id}
        className={`hl hl-${r.color}${r.note ? " hl-note" : ""}`}
        title={r.note || "Surlignage"}
        onClick={(e) => {
          e.stopPropagation();
          onMarkClick?.(r);
        }}
      >
        {text.slice(r.start, r.end)}
      </mark>
    );
    cursor = r.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

/* ------------------------------------------------------------------ */
/* Métadonnées de bloc par type                                        */
/* ------------------------------------------------------------------ */
export function blockTag(block) {
  switch (block.type) {
    case "h3":
      return "SECTION";
    case "list":
      return "LISTE";
    case "quote":
      return "CITATION";
    case "steps":
      return "ÉTAPES";
    case "callout":
      return block.title || "À RETENIR";
    default:
      return "PARAGRAPHE";
  }
}

/** Titre court d'un bloc (pour affiche 3D, étiquette de module…). */
export function blockTitle(block) {
  if (block.type === "h3") return block.text;
  if (block.type === "callout") return block.title || "À retenir";
  if (block.type === "steps") return block.items.map((it) => it.title).join(" · ");
  if (block.type === "list") return block.items.join(" · ");
  if (block.type === "quote") return block.text;
  return block.text;
}

/** Extrait les lignes d'un bloc pour un affichage court (3D / affiche). */
export function blockLines(block, maxLines = 3) {
  const text =
    block.type === "steps"
      ? block.items.map((it) => `${it.n} · ${it.title}`).join("  |  ")
      : block.type === "list"
      ? block.items.join("  ·  ")
      : block.text;
  const words = String(text).split(" ");
  const lines = [];
  let line = "";
  const maxWidth = 62; // caractères approximatifs
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (test.length > maxWidth && line) {
      lines.push(line);
      line = w;
      if (lines.length >= maxLines) break;
    } else line = test;
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}
