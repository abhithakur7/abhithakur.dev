export const STACK_GROUPS: { label: string; items: string[] }[] = [
  { label: 'languages', items: ['TypeScript', 'JavaScript'] },
  { label: 'frontend', items: ['React', 'Next.js', 'Redux', 'Tailwind CSS'] },
  { label: 'backend', items: ['Node.js', 'NestJS', 'Express'] },
  { label: 'databases', items: ['PostgreSQL', 'MongoDB'] },
  {
    label: 'cloud/devops',
    items: ['GCP', 'GCR', 'Docker', 'AWS RDS', 'Cloudflare', 'Vercel'],
  },
  {
    label: 'ci/cd',
    items: ['GitHub Actions', 'Bitbucket Pipelines', 'ETL pipelines'],
  },
  {
    label: 'payments',
    items: [
      'Stripe API',
      'Subscriptions',
      'Payouts',
      'Refunds',
      'Webhooks',
      'Idempotency',
    ],
  },
  {
    label: 'ai',
    items: ['OpenAI API', 'Prompt workflows', 'Content generation'],
  },
  {
    label: 'integrations',
    items: ['Twilio (SMS)', 'SendGrid (email)', 'Firebase Auth'],
  },
  {
    label: 'architecture',
    items: ['Multi-tenant', 'RBAC', 'Microservices', 'REST APIs'],
  },
];
