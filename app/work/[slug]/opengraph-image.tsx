import { ImageResponse } from 'next/og';
import { getAllWork, getWorkBySlug } from '@/lib/content';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Case study by Abhishek Thakur';

export async function generateStaticParams() {
  const all = await getAllWork();
  return all.map((w) => ({ slug: w.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = await getAllWork();
  const idx = all.findIndex((w) => w.slug === slug);
  const w = idx >= 0 ? await getWorkBySlug(slug) : null;
  if (!w) {
    return new ImageResponse(<div />, size);
  }
  const indexLabel = String(idx + 1).padStart(2, '0');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
          background: '#f4f5f1',
          color: '#1b1a21',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 18,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#56585f',
            fontFamily: 'monospace',
          }}
        >
          <span>{indexLabel}</span>
          <span style={{ flex: 1, height: 1, background: '#c9cbc4' }} />
          <span>Case study</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 96,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 128,
              fontWeight: 800,
              textTransform: 'uppercase',
              lineHeight: 0.95,
              letterSpacing: -3,
              display: 'flex',
              alignItems: 'baseline',
            }}
          >
            <span>{w.title}</span>
            <span style={{ color: '#2e46d0' }}>.</span>
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: '#1b1a21',
              background: '#f3dc5a',
              padding: '10px 18px',
              alignSelf: 'flex-start',
              maxWidth: 900,
              marginTop: 36,
            }}
          >
            {w.tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 32,
            borderTop: '3px solid #1b1a21',
            fontSize: 18,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#56585f',
            fontFamily: 'monospace',
          }}
        >
          <span>Abhishek Thakur</span>
          <span>Senior Full-Stack Engineer</span>
        </div>
      </div>
    ),
    size,
  );
}
