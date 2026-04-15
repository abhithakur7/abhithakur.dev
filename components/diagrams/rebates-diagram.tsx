import { DiagramFrame } from './diagram-frame';

export function RebatesDiagram() {
  return (
    <DiagramFrame caption="Fig. 03 — Search → AI report → admin gate → submit">
      <svg
        viewBox="0 0 720 380"
        role="img"
        aria-label="The Rocket Rebates pipeline: public search, then account-gated project, then deeper search, then AI report and AI submission package via OpenAI, stored in S3, reviewed by admin, then submitted by the user."
        className="block w-full text-foreground"
        fill="none"
      >
        {/* Top row — the funnel */}
        {[
          { label: 'SEARCH', sub: 'public', x: 20 },
          { label: 'PROJECT', sub: 'account', x: 160 },
          { label: 'DEEP SEARCH', sub: 'in-project', x: 300 },
        ].map((s, i, arr) => (
          <g key={s.label}>
            <rect
              x={s.x}
              y={20}
              width={120}
              height={48}
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
              y={56}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize={8}
              letterSpacing={1}
              fillOpacity={0.55}
              fill="currentColor"
            >
              {s.sub}
            </text>
            {i < arr.length - 1 && (
              <g>
                <line
                  x1={s.x + 120}
                  y1={44}
                  x2={s.x + 160}
                  y2={44}
                  stroke="currentColor"
                  strokeOpacity={0.5}
                  strokeWidth={1}
                />
                <polygon
                  points={`${s.x + 160},44 ${s.x + 154},40 ${s.x + 154},48`}
                  fill="currentColor"
                  fillOpacity={0.5}
                />
              </g>
            )}
          </g>
        ))}

        {/* Bridge to AI row */}
        <line x1={480} y1={44} x2={520} y2={44} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
        <line x1={520} y1={44} x2={520} y2={120} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
        <polygon points="520,120 516,114 524,114" fill="currentColor" fillOpacity={0.5} />

        {/* AI row — two OpenAI jobs */}
        {[
          { label: 'AI REPORT', sub: 'openai', x: 140 },
          { label: 'AI SUBMISSION', sub: 'openai · doc checklist', x: 460 },
        ].map((s) => (
          <g key={s.label}>
            <rect
              x={s.x}
              y={120}
              width={140}
              height={56}
              rx={6}
              stroke="currentColor"
              strokeWidth={1.5}
              fill="currentColor"
              fillOpacity={0.06}
            />
            <text
              x={s.x + 70}
              y={146}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize={11}
              letterSpacing={1.5}
              fill="currentColor"
            >
              {s.label}
            </text>
            <text
              x={s.x + 70}
              y={161}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize={8}
              letterSpacing={1}
              fillOpacity={0.55}
              fill="currentColor"
            >
              {s.sub}
            </text>
          </g>
        ))}

        {/* Connect AI report to AI submission */}
        <line x1={280} y1={148} x2={460} y2={148} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
        <polygon points="460,148 454,144 454,152" fill="currentColor" fillOpacity={0.5} />

        {/* AI submission down to S3 */}
        <line x1={530} y1={176} x2={530} y2={220} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
        <polygon points="530,220 526,214 534,214" fill="currentColor" fillOpacity={0.5} />

        {/* S3 */}
        <rect
          x={460}
          y={220}
          width={140}
          height={48}
          rx={6}
          stroke="currentColor"
          strokeOpacity={0.4}
          strokeWidth={1}
        />
        <text
          x={530}
          y={243}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={11}
          letterSpacing={1.5}
          fill="currentColor"
        >
          S3
        </text>
        <text
          x={530}
          y={256}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={8}
          letterSpacing={1}
          fillOpacity={0.55}
          fill="currentColor"
        >
          documents · signed urls
        </text>

        {/* S3 down to Admin gate */}
        <line x1={530} y1={268} x2={530} y2={300} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
        <polygon points="530,300 526,294 534,294" fill="currentColor" fillOpacity={0.5} />

        {/* Admin review (gate) */}
        <rect
          x={420}
          y={300}
          width={220}
          height={48}
          rx={6}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeDasharray="5 3"
        />
        <text
          x={530}
          y={323}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={11}
          letterSpacing={1.5}
          fill="currentColor"
        >
          ADMIN REVIEW
        </text>
        <text
          x={530}
          y={336}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={8}
          letterSpacing={1}
          fillOpacity={0.55}
          fill="currentColor"
        >
          approval gate
        </text>

        {/* Admin → Submit */}
        <line x1={420} y1={324} x2={300} y2={324} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
        <polygon points="300,324 306,320 306,328" fill="currentColor" fillOpacity={0.5} />

        <rect
          x={140}
          y={300}
          width={160}
          height={48}
          rx={6}
          stroke="currentColor"
          strokeOpacity={0.4}
          strokeWidth={1}
        />
        <text
          x={220}
          y={323}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={11}
          letterSpacing={1.5}
          fill="currentColor"
        >
          SUBMIT
        </text>
        <text
          x={220}
          y={336}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={8}
          letterSpacing={1}
          fillOpacity={0.55}
          fill="currentColor"
        >
          user files externally
        </text>
      </svg>
    </DiagramFrame>
  );
}
