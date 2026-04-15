import { DiagramFrame } from './diagram-frame';

export function PenbookDiagram() {
  return (
    <DiagramFrame caption="Fig. 02 — One backend, four product surfaces">
      <svg
        viewBox="0 0 720 320"
        role="img"
        aria-label="Four product surfaces — Writing, Reading, Content, and Book Clubs — fan in to a single NestJS API layer, which talks to MongoDB and OpenAI."
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
              height={56}
              rx={6}
              stroke="currentColor"
              strokeOpacity={0.4}
              strokeWidth={1}
            />
            <text
              x={s.x + 60}
              y={45}
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
              y={60}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize={9}
              letterSpacing={1}
              fillOpacity={0.55}
              fill="currentColor"
            >
              {s.sub}
            </text>
            {/* Connector */}
            <line
              x1={s.x + 60}
              y1={76}
              x2={360}
              y2={150}
              stroke="currentColor"
              strokeOpacity={0.3}
              strokeWidth={1}
              strokeDasharray="2 3"
            />
          </g>
        ))}

        {/* NestJS API layer */}
        <rect
          x={120}
          y={150}
          width={480}
          height={56}
          rx={8}
          fill="currentColor"
          fillOpacity={0.06}
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <text
          x={360}
          y={177}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={12}
          letterSpacing={2}
          fill="currentColor"
        >
          NESTJS API
        </text>
        <text
          x={360}
          y={195}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={9}
          letterSpacing={1.5}
          fillOpacity={0.55}
          fill="currentColor"
        >
          shared auth · data model · conventions
        </text>

        {/* Two backing systems */}
        <line x1={300} y1={206} x2={250} y2={250} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} strokeDasharray="2 3" />
        <line x1={420} y1={206} x2={470} y2={250} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} strokeDasharray="2 3" />

        <rect
          x={170}
          y={250}
          width={160}
          height={44}
          rx={6}
          stroke="currentColor"
          strokeOpacity={0.4}
          strokeWidth={1}
        />
        <text
          x={250}
          y={272}
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
          y={285}
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
          y={250}
          width={160}
          height={44}
          rx={6}
          stroke="currentColor"
          strokeOpacity={0.4}
          strokeWidth={1}
        />
        <text
          x={470}
          y={272}
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
          y={285}
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
