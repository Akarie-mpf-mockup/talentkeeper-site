import { test, expect } from '@playwright/test';

const pageWidth = page => page.evaluate(() => ({
  viewport: document.documentElement.clientWidth,
  content: document.documentElement.scrollWidth,
}));

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`page fits ${width}px before and during scrolling`, async ({ browser }) => {
    const page = await browser.newPage({
      viewport: { width, height: 844 }, isMobile: width < 1024, hasTouch: width < 1024,
    });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const checkWidth = async () => {
      const size = await pageWidth(page);
      expect(size.content).toBeLessThanOrEqual(size.viewport);
    };
    await checkWidth();
    // Sample actual animation frames as each story enters the viewport.
    for (const row of await page.locator('#story [style*="transition"]').all()) {
      await row.evaluate(e => e.scrollIntoView({ block: 'center' }));
      for (let frame = 0; frame < 5; frame++) {
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
        await checkWidth();
      }
    }
    await page.locator('footer').scrollIntoViewIfNeeded();
    await checkWidth();
    for (const link of await page.locator('footer a').all()) {
      const box = await link.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
    const nav = await page.locator('nav').boundingBox();
    expect(nav.y).toBeCloseTo(0, 0);
    await page.close();
  });
}

test('mobile story fades without horizontal movement; table and menu remain usable', async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto('/');
  const storyRow = page.locator('#story [style*="transition"]').filter({ hasText: 'STEP 01' }).first();
  expect(await storyRow.evaluate(e => getComputedStyle(e).transform)).toBe('none');
  await storyRow.scrollIntoViewIfNeeded();
  await expect(storyRow).toHaveCSS('opacity', '1');
  const table = page.locator('.overflow-x-auto').first();
  await table.scrollIntoViewIfNeeded();
  expect(await table.evaluate(e => { e.scrollLeft = 100; return e.scrollLeft; })).toBeGreaterThan(0);
  expect(await page.evaluate(() => scrollX)).toBe(0);
  await page.getByRole('button', { name: 'メニュー', exact: true }).click();
  await expect(page.getByRole('link', { name: '無料でお問い合わせ', exact: true })).toBeVisible();
  await expect(page.locator('nav [style*="max-height"]')).toHaveCSS('max-height', '400px');
  await page.getByRole('button', { name: 'メニュー', exact: true }).click();
  await expect(page.locator('nav [style*="max-height"]')).toHaveCSS('max-height', '0px');
  const size = await pageWidth(page);
  expect(size.content).toBe(size.viewport);
  await page.close();
});

test('horizontal reveals adapt across the desktop breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 844 });
  await page.goto('/');
  const row = page.locator('#story [style*="transition"]').filter({ hasText: 'STEP 03' }).first();
  await expect(row).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 40, 0)');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(row).toHaveCSS('transform', 'none');
  await page.setViewportSize({ width: 1024, height: 844 });
  await expect(row).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 40, 0)');
  await row.evaluate(e => e.scrollIntoView({ block: 'center' }));
  await expect(row).toHaveCSS('opacity', '1');
  await expect(row).toHaveCSS('transform', 'none');
});
