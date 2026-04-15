import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyEmail } from '@/components/copy-email';

describe('CopyEmail', () => {
  it('copies email to the clipboard when clicked and announces success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<CopyEmail email="thakur.abhi270@gmail.com" />);
    const btn = screen.getByRole('button', { name: /copy email/i });
    await userEvent.click(btn);
    expect(writeText).toHaveBeenCalledWith('thakur.abhi270@gmail.com');
    expect(await screen.findByText(/copied/i)).toBeInTheDocument();
  });
});
