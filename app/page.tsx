import { Hero } from '@/components/hero/hero';
import { SelectedWork } from '@/components/sections/selected-work';
import { WhatIDo } from '@/components/sections/what-i-do';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <WhatIDo />
    </>
  );
}
