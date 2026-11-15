/**
 * Fixed decorative backdrop: Dark Carbon & Obsidian base, deep crimson/burgundy radial orbs,
 * perspective floor/ceiling grids, SVG circuit traces, glowing crimson/ruby/ember nodes & pulses.
 * Purely visual (aria-hidden, no pointer events).
 */
const traces = [
  { id: "t1", d: "M-20 180 H220 L280 240 H520 L580 180 H860 L920 120 H1200 L1260 180 H1460" },
  { id: "t2", d: "M-20 470 H140 L200 410 H460 L520 470 H760 L820 530 H1100 L1160 470 H1460" },
  { id: "t3", d: "M-20 760 H300 L360 700 H640 L700 760 H980 L1040 820 H1300 L1360 760 H1460" },
  { id: "t4", d: "M360 -20 V120 L420 180 V380 L360 440 V620 L420 680 V920" },
  { id: "t5", d: "M1040 -20 V90 L1100 150 V340 L1040 400 V600 L1100 660 V920" },
  { id: "t6", d: "M700 -20 V200 L760 260 V420" },
];

const nodes: [number, number][] = [
  [220, 180], [520, 240], [860, 180], [1200, 120], [140, 470], [460, 410], [760, 530], [1100, 530],
  [300, 760], [640, 700], [980, 820], [420, 380], [1100, 340], [760, 420], [420, 680], [1100, 660],
];

const pulses: { path: string; dur: number; delay: number; color: string }[] = [
  { path: "t1", dur: 14, delay: 0, color: "#e11d48" },
  { path: "t2", dur: 18, delay: 3, color: "#f97316" },
  { path: "t3", dur: 16, delay: 6, color: "#dc2626" },
  { path: "t4", dur: 15, delay: 2, color: "#f97316" },
  { path: "t5", dur: 17, delay: 8, color: "#e11d48" },
  { path: "t6", dur: 11, delay: 5, color: "#f59e0b" },
  { path: "t1", dur: 20, delay: 10, color: "#dc2626" },
];

export default function Background3D() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-zinc-950">
      {/* Deep carbon & crimson depth underlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(69,10,10,0.35),transparent_65%)] bg-gradient-to-b from-red-950/30 via-zinc-950 to-zinc-950" />

      {/* Atmospheric crimson, ruby & warm ember radial orbs */}
      <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-rose-700/20 blur-[130px]" />
      <div className="absolute -right-32 top-24 h-[480px] w-[480px] rounded-full bg-red-800/20 blur-[120px]" />
      <div className="absolute left-1/3 top-[55%] h-[420px] w-[420px] rounded-full bg-orange-600/10 blur-[130px]" />

      {/* Circuit board layer */}
      <svg className="absolute inset-0 h-full w-full opacity-75" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {traces.map((t) => (
            <path key={t.id} id={t.id} d={t.d} />
          ))}
        </defs>

        {traces.map((t, idx) => (
          <use
            key={t.id}
            href={`#${t.id}`}
            stroke={idx % 2 === 0 ? "rgba(225, 29, 72, 0.14)" : "rgba(255, 255, 255, 0.05)"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        ))}

        {/* Glowing circuit nodes */}
        {nodes.map(([x, y], i) => (
          <g key={i} filter="url(#glow)">
            <circle cx={x} cy={y} r="9" fill="none" stroke="rgba(225, 29, 72, 0.28)" strokeWidth="1" />
            <circle
              cx={x}
              cy={y}
              r="3.5"
              fill={i % 3 === 0 ? "#f97316" : i % 2 === 0 ? "#e11d48" : "#dc2626"}
              className="bg-node"
              style={{ animationDelay: `${(i % 6) * 0.7}s` }}
            />
          </g>
        ))}

        {/* Moving data pulses */}
        {pulses.map((p, i) => (
          <circle key={i} r="4" fill={p.color} filter="url(#glow)" className="bg-pulse">
            <animateMotion dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" rotate="auto">
              <mpath href={`#${p.path}`} />
            </animateMotion>
          </circle>
        ))}
      </svg>

      {/* Perspective floor grid (dark crimson lines) */}
      <div className="absolute inset-x-0 bottom-0 h-[70%] [perspective:700px]">
        <div
          className="absolute -inset-x-[50%] bottom-0 h-[160%] origin-bottom [transform:rotateX(62deg)] bg-[linear-gradient(to_right,rgba(225,29,72,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(225,29,72,0.14)_1px,transparent_1px)] bg-[size:72px_72px]"
          style={{ maskImage: "linear-gradient(to top, black 10%, transparent 75%)", WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 75%)" }}
        />
      </div>

      {/* Ceiling grid (warm graphite lines) */}
      <div className="absolute inset-x-0 top-0 h-[40%] [perspective:700px]">
        <div
          className="absolute -inset-x-[50%] top-0 h-[160%] origin-top [transform:rotateX(-62deg)] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]"
          style={{ maskImage: "linear-gradient(to bottom, black 0%, transparent 70%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 70%)" }}
        />
      </div>

      {/* Vignette keeps foreground text crisp */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,8,10,0.2)_30%,rgba(8,8,10,0.8)_100%)]" />
    </div>
  );
}
