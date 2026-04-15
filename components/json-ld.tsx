export function CaseStudyJsonLd({
  slug,
  title,
  summary,
  publishedAt,
}: {
  slug: string;
  title: string;
  summary: string;
  publishedAt?: string;
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
      name: 'Abhishek Thakur',
      url: 'https://abhithakur.dev',
    },
    publisher: {
      '@type': 'Person',
      name: 'Abhishek Thakur',
      url: 'https://abhithakur.dev',
    },
    ...(publishedAt && { datePublished: publishedAt, dateModified: publishedAt }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abhishek Thakur',
    url: 'https://abhithakur.dev',
    jobTitle: 'Senior Full-Stack Engineer',
    sameAs: [
      'https://github.com/abhithakur7',
      'https://www.linkedin.com/in/abhishek-thakur-5a5260164/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chandigarh',
      addressCountry: 'IN',
    },
    email: 'mailto:thakur.abhi270@gmail.com',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
