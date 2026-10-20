'use client';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label="Copy email"
      onClick={async () => {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-foreground px-5 text-sm font-semibold hover:bg-canary hover:text-[#1b1a21] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {copied ? (
        <>
          <Check className="size-4" aria-hidden />
          <span role="status" aria-live="polite">
            Copied
          </span>
        </>
      ) : (
        <>
          <Copy className="size-4" aria-hidden />
          Copy email
        </>
      )}
    </button>
  );
}
