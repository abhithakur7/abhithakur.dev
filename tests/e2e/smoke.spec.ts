import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/work/uplevelit', '/work/penbook', '/work/rocket-rebates'];

for (const path of routes) {
  test(`${path} renders without a11y violations and has an H1`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test('theme toggle swaps the html class', async ({ page }) => {
  await page.goto('/');
  const btn = page.getByRole('button', { name: /toggle theme/i });
  const initial = await page.locator('html').getAttribute('class');
  await btn.click();
  await expect(page.locator('html')).not.toHaveAttribute('class', initial ?? '');
});

test('nav home link works', async ({ page }) => {
  await page.goto('/work/uplevelit');
  await page.getByRole('link', { name: /abhishek\.dev/i }).click();
  await expect(page).toHaveURL('/');
});
