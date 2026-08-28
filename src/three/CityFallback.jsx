import { useMemo } from 'react';

const PALETTES = {
  night: {
    sky: ['#0f0c07', '#1d140c', '#0a0806'],
    buildings: ['#120e0a', '#171008', '#1c130a', '#0e0a06'],
    rim: ['#f3cf94', '#d9a441'],
    windows: ['#f3cf94', '#d9c2a0', '#d9a441', '#fdfaf2'],
    sun: '#f3cf94',
    sunInner: '#ffe9c2',
    rain: true,
    fog: 'rgba(10,8,6,0.85)',
    horizon: 'rgba(16,11,7,0.9)',
    grid: '#a5773f',
  },
  day: {
    sky: ['#f2e7d3', '#e8dcc4', '#d9c2a0'],
    buildings: ['#a98a5e', '#9c7c4f', '#8f7050', '#b2926b'],
    rim: ['#e8c98a'],
    windows: ['#fff6e4', '#e8c98a', '#ffe9c2'],
    sun: '#fff3dd',
    sunInner: '#ffe9c2',
    rain: false,
    fog: 'rgba(240,230,210,0.55)',
    horizon: 'rgba(216,196,158,0.9)',
    grid: '#c4a26a',
  },
};

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function CityFallback({ mode = 'night' }) {
  const p = PALETTES[mode] ?? PALETTES.night;
  const rng = useMemo(() => mulberry32(20260827), []);
  const buildings = useMemo(() => {
    const items = [];
    let x = 0;
    const count = 46;
    for (let i = 0; i < count; i += 1) {
      const bw = 16 + rng() * 34;
      const bh = 60 + Math.pow(rng(), 1.5) * 330;
      const windows = [];
      const cols = Math.max(2, Math.floor(bw / 7));
      const rows = Math.max(3, Math.floor(bh / 9));
      for (let c = 0; c < cols; c += 1) {
        for (let r = 0; r < rows; r += 1) {
          if (rng() < (mode === 'night' ? 0.42 : 0.09)) {
            windows.push({
              cx: c * (bw / cols) + bw / (cols * 2),
              cy: r * (bh / rows) + bh / (rows * 2),
              color: p.windows[Math.floor(rng() * p.windows.length)],
              delay: (rng() * 4).toFixed(2),
            });
          }
        }
      }
      items.push({
        x,
        w: bw,
        h: bh,
        fill: p.buildings[Math.floor(rng() * p.buildings.length)],
        rim: mode === 'night' && rng() > 0.45 ? p.rim[Math.floor(rng() * p.rim.length)] : null,
        windows,
      });
      x += bw + 2 + rng() * 4;
    }
    const total = x - (2 + rng() * 4);
    const scale = 1000 / total;
    items.forEach((b) => {
      b.x *= scale;
      b.w *= scale;
      b.h *= scale;
      b.windows.forEach((w) => {
        w.cx *= scale;
        w.cy *= scale;
      });
    });
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const rain = useMemo(() => {
    if (!p.rain) return [];
    return Array.from({ length: 36 }, (_, i) => ({
      left: rng() * 100,
      h: 40 + rng() * 90,
      top: -10 - rng() * 30,
      delay: (rng() * 1.8).toFixed(2),
      dur: (0.7 + rng() * 0.9).toFixed(2),
      o: (0.18 + rng() * 0.22).toFixed(2),
      key: i,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <div className="fallback-city absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        .fallback-city, .fallback-city * { box-sizing: border-box; }
        .fc-sky {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, ${p.sky[0]} 0%, ${p.sky[1]} 54%, ${p.sky[2]} 100%);
        }
.fc-sun {
          position: absolute; top: 6%; left: 50%; transform: translateX(-50%);
          width: min(66vw, 58vh); aspect-ratio: 16/9;
          background: radial-gradient(120% 120% at 50% 62%,
            rgba(193,154,107,0.22) 0%, rgba(193,154,107,0.06) 45%, rgba(0,0,0,0) 72%);
        }
        .fc-haze {
          position: absolute; left: 0; right: 0; bottom: 0; height: 46%;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, ${p.horizon} 68%);
        }
        .fc-skyline { position: absolute; left: 0; right: 0; bottom: 0; height: 58%; width: 100%; }
        .fc-glow-grid {
          position: absolute; left: 0; right: 0; bottom: 3%; height: 22%;
          opacity: ${mode === 'night' ? 0.18 : 0.12};
          background:
            repeating-linear-gradient(90deg, ${p.grid} 0 2px, transparent 2px 58px),
            repeating-linear-gradient(0deg, ${p.grid} 0 2px, transparent 2px 58px);
          transform: perspective(300px) rotateX(58deg) scale(1.6);
          transform-origin: 50% 100%;
        }
        .fc-window { animation: fcTwinkle 3.2s ease-in-out infinite; }
        .fc-rim { filter: drop-shadow(0 0 2px currentColor); }
        .fc-billboard {
          position: absolute; left: 5%; bottom: 7%;
          width: clamp(150px, 18vw, 230px); aspect-ratio: 5 / 2.8;
        }
        .fc-billboard-panel {
          position: relative; width: 100%; height: 100%; overflow: hidden;
          border-radius: 2px; box-shadow: 0 10px 24px rgba(0,0,0,0.5);
        }
        .fc-billboard-green {
          position: absolute; left: 0; top: 0; width: 33.33%; height: 100%;
          background: #00853F;
        }
        .fc-billboard-flag {
          position: absolute; left: 33.33%; top: 0; width: 66.67%; height: 100%;
          background: linear-gradient(180deg, #FCD116 0 50%, #E8112D 50% 100%);
        }
        .fc-billboard-legs { position: absolute; left: 0; right: 0; bottom: -34px; height: 34px; }
        .fc-billboard-leg { position: absolute; top: 0; width: 5px; height: 100%; background: rgba(10,8,6,0.85); }
        .fc-billboard-leg:nth-child(1) { left: 12%; }
        .fc-billboard-leg:nth-child(2) { right: 12%; }
        .fc-rain { position: absolute; left: 0; top: 0; right: 0; height: 120%; pointer-events: none; }
        .fc-drop {
          position: absolute; width: 1px;
          background: linear-gradient(180deg, rgba(243,207,148,0) 0%, #d9c2a0 100%);
          animation: fcRain linear infinite;
        }
        @keyframes fcSunPulse {
          0%, 100% { opacity: 0.95; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.03); }
        }
        @keyframes fcTwinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes fcRain {
          0% { transform: translateY(-10vh); opacity: 0.9; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fc-sun, .fc-window, .fc-drop { animation: none !important; }
        }
      `}</style>
      <div className="fc-sky" />
      <div className="fc-sun" />
      <svg
        className="fc-skyline"
        viewBox="0 0 1000 400"
        preserveAspectRatio="xMidYMax slice"
      >
        {buildings.map((b, bi) => (
          <g key={bi}>
            <rect x={b.x} y={400 - b.h} width={b.w} height={b.h} fill={b.fill} />
            {b.rim && (
              <rect
                className="fc-rim"
                x={b.x}
                y={400 - b.h}
                width={b.w}
                height={2}
                fill={b.rim}
                style={{ color: b.rim }}
              />
            )}
            {b.windows.map((win, wi) => (
              <rect
                key={wi}
                className="fc-window"
                x={b.x + win.cx - 1.6}
                y={400 - b.h + win.cy - 2}
                width={3.2}
                height={4}
                fill={win.color}
                style={{ animationDelay: `${win.delay}s` }}
              />
            ))}
          </g>
        ))}
      </svg>
      <div className="fc-haze" />
      {/* Panneau statique : drapeau du Bénin sur la place, comme en 3D */}
      <div className="fc-billboard" aria-hidden="true">
        <div className="fc-billboard-panel">
          <div className="fc-billboard-green" />
          <div className="fc-billboard-flag" />
        </div>
        <div className="fc-billboard-legs">
          <div className="fc-billboard-leg" />
          <div className="fc-billboard-leg" />
        </div>
      </div>
      <div className="fc-glow-grid" />
      {p.rain && (
        <div className="fc-rain">
          {rain.map((d) => (
            <div
              key={d.key}
              className="fc-drop"
              style={{
                left: `${d.left}%`,
                height: `${d.h}px`,
                top: `${d.top}%`,
                opacity: d.o,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.dur}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}