import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

describe('ThemeToggle', () => {
  it('toggles the theme class on <html> between light and dark', async () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    );
    const btn = screen.getByRole('button', { name: /toggle theme/i });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    await userEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('exposes an accessible name', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });
});
