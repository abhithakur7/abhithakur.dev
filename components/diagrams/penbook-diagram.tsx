import { DiagramFrame } from './diagram-frame';

export function PenbookDiagram() {
  return (
    <DiagramFrame caption="Fig. 02 — Modular monolith: four surfaces, isolated NestJS modules">
      <svg
        viewBox="0 0 720 380"
        role="img"
        aria-label="Four product surfaces — Writing, Reading, Content, and Book Clubs — fan into a NestJS modular monolith. Inside, six bounded modules: accounts, writing, reading, content, clubs, and AI. The monolith talks to MongoDB and OpenAI."
        className="block w-full text-foreground"
        fill="none"
      >
        {/* Top row — 4 surfaces */}
        {[
          { label: 'WRITING', sub: 'AI-assisted', x: 40 },
          { label: 'READING', sub: 'discovery', x: 220 },
          { label: 'CONTENT', sub: 'ugc', x: 400 },
          { label: 'BOOK CLUBS', sub: 'community', x: 580 },
        ].map((s) => (
          <g key={s.label}>
            <rect
              x={s.x}
              y={20}
              width={120}
              height={50}
              rx={6}
              stroke="currentColor"
              strokeOpacity={0.4}
              strokeWidth={1}
            />
            <text
              x={s.x + 60}
              y={43}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize={11}
              letterSpacing={1.5}
              fill="currentColor"
            >
              {s.label}
            </text>
            <text
              x={s.x + 60}
              y={57}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize={9}
              letterSpacing={1}
              fillOpacity={0.55}
              fill="currentColor"
            >
              {s.sub}
            </text>
            <line
              x1={s.x + 60}
              y1={70}
              x2={360}
              y2={130}
              stroke="currentColor"
              strokeOpacity={0.3}
              strokeWidth={1}
              strokeDasharray="2 3"
            />
          </g>
        ))}

        {/* NestJS modular monolith — outer box */}
        <rect
          x={40}
          y={130}
          width={640}
          height={130}
          rx={10}
          fill="currentColor"
          fillOpacity={0.04}
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <text
          x={60}
          y={152}
          fontFamily="ui-monospace, monospace"
          fontSize={10}
          letterSpacing={2}
          fillOpacity={0.7}
          fill="currentColor"
        >
          NESTJS · MODULAR MONOLITH
        </text>

        {/* Internal modules — 6 boxes in a row */}
        {[
          { label: 'accounts', x: 60 },
          { label: 'writing', x: 160 },
          { label: 'reading', x: 260 },
          { label: 'content', x: 360 },
          { label: 'clubs', x: 460 },
          { label: 'ai', x: 560 },
        ].map((m) => (
          <g key={m.label}>
            <rect
              x={m.x}
              y={170}
              width={88}
              height={40}
              rx={4}
              fill="currentColor"
              fillOpacity={0.06}
              stroke="currentColor"
              strokeOpacity={0.5}
              strokeWidth={1}
            />
            <text
              x={m.x + 44}
              y={194}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize={11}
              letterSpacing={1}
              fill="currentColor"
            >
              {m.label}
            </text>
          </g>
        ))}
        <text
          x={360}
          y={236}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={9}
          letterSpacing={1.5}
          fillOpacity={0.55}
          fill="currentColor"
        >
          bounded interfaces · shared auth and data conventions
        </text>

        {/* Two backing systems */}
        <line x1={300} y1={260} x2={250} y2={300} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} strokeDasharray="2 3" />
        <line x1={420} y1={260} x2={470} y2={300} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} strokeDasharray="2 3" />

        <rect
          x={170}
          y={300}
          width={160}
          height={48}
          rx={6}
          stroke="currentColor"
          strokeOpacity={0.4}
          strokeWidth={1}
        />
        <text
          x={250}
          y={324}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={11}
          letterSpacing={1.5}
          fill="currentColor"
        >
          MONGODB
        </text>
        <text
          x={250}
          y={338}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={8}
          letterSpacing={1}
          fillOpacity={0.55}
          fill="currentColor"
        >
          documents · indexes
        </text>

        <rect
          x={390}
          y={300}
          width={160}
          height={48}
          rx={6}
          stroke="currentColor"
          strokeOpacity={0.4}
          strokeWidth={1}
        />
        <text
          x={470}
          y={324}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={11}
          letterSpacing={1.5}
          fill="currentColor"
        >
          OPENAI
        </text>
        <text
          x={470}
          y={338}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={8}
          letterSpacing={1}
          fillOpacity={0.55}
          fill="currentColor"
        >
          server-side mediation
        </text>
      </svg>
    </DiagramFrame>
  );
}
