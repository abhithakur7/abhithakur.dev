import { getAllWork } from '@/lib/content';
import { SectionHeader } from '@/components/section-header';
import { DocketRail } from './docket-rail';

export async function SelectedWork() {
  const work = await getAllWork();
  return (
    <section id="work" className="py-20 sm:py-24 lg:py-0">
      <DocketRail
        items={work.map(({ slug, title, tagline, stack, role, timeframe }) => ({
          slug,
          title,
          tagline,
          stack,
          role,
          timeframe,
        }))}
        header={
          <SectionHeader
            title="Shipped work"
            description="A casting portal, legal document tools, a marketplace, a writing platform and a rebate tool. What I built, and the bugs worth telling."
          />
        }
      />
    </section>
  );
}
