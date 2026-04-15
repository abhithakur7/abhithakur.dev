import { Hero } from '@/components/hero/hero';
import { SelectedWork } from '@/components/sections/selected-work';
import { WhatIDo } from '@/components/sections/what-i-do';
import { StackTerminal } from '@/components/sections/stack-terminal';
import { Experience } from '@/components/sections/experience';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <WhatIDo />
      <StackTerminal />
      <Experience />
    </>
  );
}
