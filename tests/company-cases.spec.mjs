import { test, expect } from '@playwright/test';

const companies = [
  { name: '株式会社ワイズマート', path: '/case/wisemart-retention-support/' },
  { name: '株式会社サンケイビルウェルケア', path: '/case/sankei-wellcare-employee-survey/' },
];

for (const width of [390, 1440]) {
  test.describe(`${width}px viewport`, () => {
    test.use({ viewport: { width, height: 1000 }, isMobile: width < 1024, hasTouch: width < 1024 });
    test(`company cards lead to complete, readable articles at ${width}px`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const company of companies) {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        const cards = page.locator('[data-company-cases] a');
        await expect(cards).toHaveCount(2);
        const card = cards.filter({ hasText: company.name });
        await card.scrollIntoViewIfNeeded();
        const logo = card.locator('img');
        await expect(logo).toHaveAttribute('alt', `${company.name}のロゴ`);
        await expect(logo).toHaveJSProperty('complete', true);
        expect(await logo.evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
        await card.click();
        await expect(page).toHaveURL(new RegExp(`${company.path}$`));
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('.company-identity')).toContainText(company.name);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.talentkeeper.jp${company.path}`);
        await expect(page.locator('.cta')).toHaveCount(2);
        await expect(page.locator('.article-body')).not.toContainText(/CTA設置位置|出典台帳|社内限定|@@CTA|:::cta/);
        const articleLogo = page.locator('.company-logo img');
        await expect(articleLogo).toHaveJSProperty('complete', true);
        expect(await articleLogo.evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
        const fit = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
        expect(fit).toBe(true);
        const related = page.locator('.related-list a[href^="/case/"]');
        await expect(related).toHaveAttribute('href', companies.find(c => c.path !== company.path).path);
        await page.getByRole('link', { name: '企業導入事例に戻る', exact: true }).click();
        await expect(page).toHaveURL(/\/#cases$/);
        await expect(page.locator('[data-company-cases]')).toBeVisible();
      }
      expect(errors).toEqual([]);
    });
  });
}

test('sitemap retains every existing article and adds both company pages', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBe(true);
  const urls = [...(await response.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  expect(urls).toEqual(expect.arrayContaining(companies.map(c => c.path)));
  const oldPages = ['/voices/', '/voices/shinnyushain-kinmu-fuan/', '/voices/ojt-kyoiku-zure/',
    '/voices/kinmu-rule-fukohei/', '/voices/ido-kibo-career/', '/voices/work-life-balance-taishoku/'];
  expect(urls).toEqual(expect.arrayContaining(oldPages));
  expect(new Set(urls).size).toBe(9);
  for (const path of oldPages) {
    const article = await request.get(path);
    expect(article.ok()).toBe(true);
    expect(await article.text()).toContain('<h1>');
  }
});
