import { PersonJsonLd } from '@/components/json-ld';
import { Hero } from '@/components/hero/hero';
import { Reveal } from '@/components/reveal';
import { SelectedWork } from '@/components/sections/selected-work';
import { WhatIDo } from '@/components/sections/what-i-do';
import { StackTerminal } from '@/components/sections/stack-terminal';
import { Experience } from '@/components/sections/experience';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <Reveal>
        <SelectedWork />
      </Reveal>
      <Reveal>
        <WhatIDo />
      </Reveal>
      <Reveal>
        <StackTerminal />
      </Reveal>
      <Reveal>
        <Experience />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
    </>
  );
}
