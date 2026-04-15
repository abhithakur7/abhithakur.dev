export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border sm:mt-32">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center sm:py-12">
        <p className="font-mono uppercase tracking-widest">
          © {year} · Abhishek Thakur
        </p>
        <p className="font-mono uppercase tracking-widest">
          Built in <span className="font-display normal-case italic text-foreground">Chandigarh</span> · Next.js · Vercel
        </p>
      </div>
    </footer>
  );
}
