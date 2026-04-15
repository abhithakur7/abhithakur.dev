import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background:
            'linear-gradient(135deg, #0a0a0a 0%, #1e1b4b 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: '#a5b4fc',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Senior Full-Stack Engineer
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 16 }}>
          Abhishek Thakur
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#cbd5e1',
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          SaaS & payment systems — Node, NestJS, React, Stripe, GCP.
        </div>
      </div>
    ),
    size,
  );
}
