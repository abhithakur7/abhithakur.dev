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
          justifyContent: 'space-between',
          padding: 80,
          background: '#f4f5f1',
          color: '#1b1a21',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, color: '#56585f' }}>
          Senior full-stack engineer, Chandigarh
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4, textTransform: 'uppercase' }}>
            Abhishek
          </div>
          <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4, textTransform: 'uppercase' }}>
            Thakur
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            background: '#f3dc5a',
            padding: '14px 22px',
            fontSize: 28,
            fontFamily: 'monospace',
            transform: 'rotate(-1.5deg)',
          }}
        >
          Booking flows, Stripe payouts and the APIs behind them
        </div>
      </div>
    ),
    size,
  );
}
