import { getCapabilities } from '@/lib/content';
import { SectionHeader } from '@/components/section-header';
import { Triplicate } from './triplicate';

export async function WhatIDo() {
  const { pillars } = await getCapabilities();
  return (
    <section
      id="what-i-do"
      className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20"
    >
      <SectionHeader
        title="What I do"
        description="Most of my work sits where a product touches money or paperwork: bookings, payouts, documents that need a human to check them."
      />
      <Triplicate pillars={pillars.map(({ title, description }) => ({ title, description }))} />
    </section>
  );
}
