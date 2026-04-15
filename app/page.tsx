import { PersonJsonLd } from '@/components/json-ld';
import { Hero } from '@/components/hero/hero';
import { SelectedWork } from '@/components/sections/selected-work';
import { WhatIDo } from '@/components/sections/what-i-do';
import { StackTerminal } from '@/components/sections/stack-terminal';
import { Experience } from '@/components/sections/experience';
import { GithubActivity } from '@/components/sections/github-activity';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <SelectedWork />
      <WhatIDo />
      <StackTerminal />
      <Experience />
      <GithubActivity />
      <Contact />
    </>
  );
}
