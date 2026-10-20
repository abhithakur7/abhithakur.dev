import { PersonJsonLd } from '@/components/json-ld';
import { Hero } from '@/components/hero/hero';
import { SelectedWork } from '@/components/sections/selected-work';
import { WhatIDo } from '@/components/sections/what-i-do';
import { Stack } from '@/components/sections/stack';
import { Experience } from '@/components/sections/experience';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <SelectedWork />
      <WhatIDo />
      <Stack />
      <Experience />
      <Contact />
    </>
  );
}
