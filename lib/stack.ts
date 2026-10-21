export const STACK_GROUPS: { label: string; items: string[] }[] = [
  { label: 'languages', items: ['TypeScript', 'JavaScript', 'Python'] },
  { label: 'frontend', items: ['React', 'Next.js', 'Redux', 'Tailwind CSS'] },
  { label: 'backend', items: ['Node.js', 'NestJS', 'Express'] },
  { label: 'data', items: ['PostgreSQL', 'MongoDB', 'Firebase', 'ETL'] },
  {
    label: 'cloud',
    items: ['GCP', 'Docker', 'AWS RDS', 'AWS S3', 'Cloudflare', 'Vercel'],
  },
  {
    label: 'delivery',
    items: ['GitHub Actions', 'Bitbucket Pipelines'],
  },
  {
    label: 'payments',
    items: ['Stripe', 'Subscriptions', 'Payouts', 'Refunds', 'Webhooks'],
  },
  {
    label: 'ai',
    items: ['OpenAI API', 'Anthropic API', 'Document processing', 'Report generation'],
  },
  {
    label: 'integrations',
    items: ['Twilio Video', 'Bunny Stream', 'SendGrid', 'Firebase Auth', 'Shopify'],
  },
  {
    label: 'architecture',
    items: ['Multi-tenant applications', 'Role-based access', 'REST APIs'],
  },
];
