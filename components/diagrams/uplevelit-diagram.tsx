import { DiagramFrame } from './diagram-frame';

export function UplevelitDiagram() {
  return (
    <DiagramFrame caption="Fig. 01 — Session pipeline across four formats">
      <svg
        viewBox="0 0 720 360"
        role="img"
        aria-label="Four session formats — 1:1, group, livecourse, Q&A — fan in to a shared Session abstraction. The Session drives Stripe payment, Twilio video, and Bunny recording, with payouts routed back through Stripe."
        className="block w-full text-foreground"
        fill="none"
      >
        {/* Top row — 4 formats */}
        {[
          { label: '1:1', x: 60 },
          { label: 'GROUP', x: 220 },
          { label: 'LIVECOURSE', x: 380 },
          { label: 'Q&A', x: 560 },
        ].map((f) => (
          <g key={f.label}>
            <rect
              x={f.x}
              y={20}
              width={100}
              height={44}
              rx={6}
              stroke="currentColor"
              strokeOpacity={0.4}
              strokeWidth={1}
            />
            <text
              x={f.x + 50}
              y={47}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize={11}
              letterSpacing={1.5}
              fill="currentColor"
            >
              {f.label}
            </text>
            {/* Connector down */}
            <line
              x1={f.x + 50}
              y1={64}
              x2={f.x + 50}
              y2={120}
              stroke="currentColor"
              strokeOpacity={0.3}
              strokeWidth={1}
              strokeDasharray="2 3"
            />
          </g>
        ))}

        {/* Convergence triangle to Session */}
        <line x1={110} y1={120} x2={360} y2={150} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} strokeDasharray="2 3" />
        <line x1={270} y1={120} x2={360} y2={150} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} strokeDasharray="2 3" />
        <line x1={430} y1={120} x2={360} y2={150} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} strokeDasharray="2 3" />
        <line x1={610} y1={120} x2={360} y2={150} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} strokeDasharray="2 3" />

        {/* Session abstraction */}
        <rect
          x={220}
          y={150}
          width={280}
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
          SESSION
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
          shared abstraction
        </text>

        {/* Three branches */}
        {[
          { label: 'STRIPE', sub: 'payment', x: 80 },
          { label: 'TWILIO VIDEO', sub: 'live call', x: 310 },
          { label: 'BUNNY STREAM', sub: 'recording', x: 540 },
        ].map((b) => (
          <g key={b.label}>
            <line
              x1={360}
              y1={206}
              x2={b.x + 50}
              y2={250}
              stroke="currentColor"
              strokeOpacity={0.3}
              strokeWidth={1}
              strokeDasharray="2 3"
            />
            <rect
              x={b.x}
              y={250}
              width={100}
              height={44}
              rx={6}
              stroke="currentColor"
              strokeOpacity={0.4}
              strokeWidth={1}
            />
            <text
              x={b.x + 50}
              y={272}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize={10}
              letterSpacing={1.2}
              fill="currentColor"
            >
              {b.label}
            </text>
            <text
              x={b.x + 50}
              y={285}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize={8}
              letterSpacing={1}
              fillOpacity={0.55}
              fill="currentColor"
            >
              {b.sub}
            </text>
          </g>
        ))}

        {/* Payout return path from Stripe */}
        <path
          d="M 80 272 Q 30 272 30 330 L 690 330 Q 690 272 640 272"
          stroke="currentColor"
          strokeOpacity={0.4}
          strokeWidth={1}
          strokeDasharray="3 4"
        />
        <text
          x={360}
          y={345}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={9}
          letterSpacing={1.5}
          fillOpacity={0.6}
          fill="currentColor"
        >
          ← stripe payout to operator
        </text>
      </svg>
    </DiagramFrame>
  );
}
