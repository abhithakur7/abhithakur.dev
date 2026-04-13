export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <p>© {year} Abhishek Thakur</p>
        <p className="font-mono">Built with Next.js · Deployed on Vercel</p>
      </div>
    </footer>
  );
}
