import { getAllWork } from '@/lib/content';
import { SectionHeader } from '@/components/section-header';
import { WorkRow } from './work-row';

export async function SelectedWork() {
  const work = await getAllWork();
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeader
        index="01"
        eyebrow="Selected work"
        title={
          <>
            Things I&apos;ve <span className="italic">shipped</span>.
          </>
        }
        description="Three case studies from the last few years — the products live, the stacks real, the trade-offs honest."
      />
      <ol className="divide-y divide-border border-y border-border">
        {work.map((w, i) => (
          <li key={w.slug}>
            <WorkRow
              index={i}
              slug={w.slug}
              title={w.title}
              tagline={w.tagline}
              stack={w.stack}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
