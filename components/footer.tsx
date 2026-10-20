import { DontPress } from './dont-press';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-2 border-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p data-fall>© {year} Abhishek Thakur. Built in Chandigarh with Next.js.</p>
        <DontPress />
      </div>
    </footer>
  );
}
