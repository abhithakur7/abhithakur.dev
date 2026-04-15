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
