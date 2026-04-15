import { DiagramFrame } from './diagram-frame';

type Variant = 'plain' | 'hi' | 'dashed';

const BOX_W = 140;
const BOX_H = 48;

function Box({
  x,
  y,
  label,
  sub,
  variant = 'plain',
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  variant?: Variant;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={BOX_W}
        height={BOX_H}
        rx={6}
        stroke="currentColor"
        strokeOpacity={variant === 'plain' ? 0.4 : 1}
        strokeWidth={variant === 'plain' ? 1 : 1.5}
        strokeDasharray={variant === 'dashed' ? '5 3' : undefined}
        fill={variant === 'hi' ? 'currentColor' : 'none'}
        fillOpacity={variant === 'hi' ? 0.06 : 0}
      />
      <text
        x={x + BOX_W / 2}
        y={y + 24}
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize={11}
        letterSpacing={1.2}
        fill="currentColor"
      >
        {label}
      </text>
      <text
        x={x + BOX_W / 2}
        y={y + 37}
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize={8}
        letterSpacing={0.6}
        fillOpacity={0.55}
        fill="currentColor"
      >
        {sub}
      </text>
    </g>
  );
}

function RightArrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1} />
      <polygon
        points={`${x2},${y} ${x2 - 6},${y - 4} ${x2 - 6},${y + 4}`}
        fill="currentColor"
        fillOpacity={0.5}
      />
    </g>
  );
}

export function RebatesDiagram() {
  // 4-column grid — 140w boxes with 30px arrow gaps. Both rows read left→right;
  // a U-turn bridge returns from the right end of row 1 back to the left end of row 2.
  const cols = [30, 200, 370, 540];
  const row1Y = 30;
  const row2Y = 180;
  const bridgeY = 120;

  return (
    <DiagramFrame caption="Fig. 03 — Search → AI report → admin gate → submit">
      <svg
        viewBox="0 0 720 280"
        role="img"
        aria-label="The Rocket Rebates pipeline: public search, then account-gated project, then deeper in-project search, then an AI-generated program report. A second OpenAI job produces the submission checklist, documents are stored in S3, an admin reviews and approves, then the user files the submission externally."
        className="block w-full text-foreground"
        fill="none"
      >
        {/* Row 1 — discovery → AI report */}
        <Box x={cols[0]!} y={row1Y} label="SEARCH" sub="public" />
        <Box x={cols[1]!} y={row1Y} label="PROJECT" sub="account" />
        <Box x={cols[2]!} y={row1Y} label="DEEP SEARCH" sub="in-project" />
        <Box x={cols[3]!} y={row1Y} label="AI REPORT" sub="openai" variant="hi" />
        {cols.slice(0, 3).map((x) => (
          <RightArrow key={`r1-${x}`} x1={x + BOX_W} x2={x + BOX_W + 30} y={row1Y + 24} />
        ))}

        {/* U-turn bridge — from AI REPORT right edge, over the top, back down to AI SUBMISSION left edge */}
        <path
          d={`M ${cols[3]! + BOX_W} ${row1Y + 24} H 700 V ${bridgeY} H 10 V ${row2Y + 24} H ${cols[0]!}`}
          stroke="currentColor"
          strokeOpacity={0.5}
          strokeWidth={1}
          fill="none"
        />
        <polygon
          points={`${cols[0]!},${row2Y + 24} ${cols[0]! - 6},${row2Y + 20} ${cols[0]! - 6},${row2Y + 28}`}
          fill="currentColor"
          fillOpacity={0.5}
        />

        {/* Row 2 — submission → review → file */}
        <Box x={cols[0]!} y={row2Y} label="AI SUBMISSION" sub="checklist" variant="hi" />
        <Box x={cols[1]!} y={row2Y} label="S3" sub="signed urls" />
        <Box x={cols[2]!} y={row2Y} label="ADMIN REVIEW" sub="approval gate" variant="dashed" />
        <Box x={cols[3]!} y={row2Y} label="SUBMIT" sub="files externally" />
        {cols.slice(0, 3).map((x) => (
          <RightArrow key={`r2-${x}`} x1={x + BOX_W} x2={x + BOX_W + 30} y={row2Y + 24} />
        ))}
      </svg>
    </DiagramFrame>
  );
}
