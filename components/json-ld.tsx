export function CaseStudyJsonLd({
  slug,
  title,
  summary,
  publishedAt,
  updatedAt,
  faq,
}: {
  slug: string;
  title: string;
  summary: string;
  publishedAt?: string;
  updatedAt?: string;
  faq?: { q: string; a: string }[];
}) {
  const url = `https://abhithakur.dev/work/${slug}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: summary,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    author: {
      '@type': 'Person',
      '@id': 'https://abhithakur.dev/#person',
      name: 'Abhishek Thakur',
      url: 'https://abhithakur.dev',
    },
    publisher: {
      '@type': 'Person',
      name: 'Abhishek Thakur',
      url: 'https://abhithakur.dev',
    },
    ...(publishedAt && { datePublished: publishedAt }),
    ...((updatedAt ?? publishedAt) && { dateModified: updatedAt ?? publishedAt }),
  };
  const faqData = faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Work', item: 'https://abhithakur.dev/#work' },
      { '@type': 'ListItem', position: 2, name: title, item: url },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
      )}
    </>
  );
}

export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://abhithakur.dev/#person',
    name: 'Abhishek Thakur',
    givenName: 'Abhishek',
    familyName: 'Thakur',
    alternateName: ['Abhi Thakur', 'Abhi', 'abhithakur', 'abhi-thakur-dev'],
    description:
      'Senior full-stack engineer and Kinetichex lead based in Chandigarh, India. Builds booking flows, Stripe integrations, writing tools and rebate application workflows.',
    url: 'https://abhithakur.dev',
    mainEntityOfPage: 'https://abhithakur.dev',
    image: 'https://abhithakur.dev/opengraph-image',
    jobTitle: 'Senior Full-Stack Engineer',
    knowsAbout: [
      'Full-stack engineering',
      'SaaS platforms',
      'Payment systems',
      'Stripe',
      'Node.js',
      'NestJS',
      'React',
      'TypeScript',
      'PostgreSQL',
      'MongoDB',
      'Firebase',
      'Google Cloud Platform',
      'AI and LLM integration',
    ],
    knowsLanguage: ['en', 'hi', 'pa'],
    nationality: { '@type': 'Country', name: 'India' },
    workLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chandigarh',
        addressRegion: 'Chandigarh',
        addressCountry: 'IN',
      },
    },
    sameAs: [
      'https://github.com/abhithakur7',
      'https://www.linkedin.com/in/abhi-thakur-dev/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chandigarh',
      addressCountry: 'IN',
    },
    email: 'mailto:hi@abhithakur.dev',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
