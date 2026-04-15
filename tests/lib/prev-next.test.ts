import { describe, it, expect } from 'vitest';
import { computePrevNext } from '@/lib/prev-next';

const slugs = ['uplevelit', 'penbook', 'rocket-rebates'];

describe('computePrevNext', () => {
  it('wraps at the start', () => {
    expect(computePrevNext(slugs, 'uplevelit')).toEqual({
      prev: 'rocket-rebates',
      next: 'penbook',
    });
  });
  it('wraps at the end', () => {
    expect(computePrevNext(slugs, 'rocket-rebates')).toEqual({
      prev: 'penbook',
      next: 'uplevelit',
    });
  });
  it('returns nulls for unknown slug', () => {
    expect(computePrevNext(slugs, 'nope')).toEqual({ prev: null, next: null });
  });
});
