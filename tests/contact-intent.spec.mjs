import { test, expect } from '@playwright/test';

for (const width of [390, 1440]) {
  test.describe(`${width}px contact intent`, () => {
    test.use({ viewport: { width, height: 1000 } });

    test('document request and consultation keep distinct intents through submission', async ({ page }) => {
      const requests = [];
      await page.route('https://formspree.io/f/xdapojqn', async route => {
        requests.push(route.request().postDataJSON());
        await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
      });
      await page.goto('/');
      const hero = page.locator('section').first();
      await hero.getByRole('link', { name: '導入について相談する' }).click();
      await expect(page.locator('#request-type')).toHaveValue('導入相談');
      await hero.getByRole('link', { name: '資料を請求する' }).click();
      await expect(page.locator('#request-type')).toHaveValue('資料請求');
      await page.locator('[name="company"]').fill('テスト会社');
      await page.locator('[name="name"]').fill('テスト担当者');
      await page.locator('[name="email"]').fill('test@example.invalid');
      await page.getByRole('button', { name: '資料を請求する →', exact: true }).click();
      await expect(page.getByRole('heading', { name: '資料請求を受け付けました' })).toBeVisible();
      expect(requests[0].requestType).toBe('資料請求');
      expect(requests[0]._subject).toContain('TalentKeeper／資料請求');
      await page.getByRole('button', { name: '別の用件を送る' }).click();
      await page.locator('#request-type').selectOption('導入相談');
      await page.getByRole('button', { name: '導入について相談する →', exact: true }).click();
      await expect(page.getByRole('heading', { name: '導入相談を受け付けました' })).toBeVisible();
      expect(requests[1].requestType).toBe('導入相談');
      expect(requests[1]._subject).toContain('TalentKeeper／導入相談');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });

    test('article entry, price plan, and failed submission preserve consultation intent', async ({ page }) => {
      let attempts = 0;
      await page.route('https://formspree.io/f/xdapojqn', async route => {
        attempts += 1;
        await route.fulfill({ status: attempts === 1 ? 500 : 200, contentType: 'application/json', body: '{}' });
      });
      await page.goto('/voices/shinnyushain-kinmu-fuan/');
      await page.getByRole('link', { name: '入社後フォローについて相談する', exact: true }).click();
      await expect(page.locator('#request-type')).toHaveValue('導入相談');
      await page.goto('/#pricing');
      await page.locator('#pricing').getByRole('link', { name: '導入について相談する' }).first().click();
      await expect(page.locator('#request-type')).toHaveValue('導入相談');
      await page.locator('[name="company"]').fill('テスト会社');
      await page.locator('[name="name"]').fill('テスト担当者');
      await page.locator('[name="email"]').fill('test@example.invalid');
      const submit = page.getByRole('button', { name: '導入について相談する →', exact: true });
      await submit.click();
      await expect(page.getByText('送信に失敗しました。時間をおいて再度お試しください。')).toBeVisible();
      await expect(page.locator('[name="company"]')).toHaveValue('テスト会社');
      await expect(page.locator('#request-type')).toHaveValue('導入相談');
      await submit.click();
      await expect(page.getByRole('heading', { name: '導入相談を受け付けました' })).toBeVisible();
      await page.goto('/#contact');
      await expect(page.locator('#request-type')).toHaveValue('資料請求');
      if (width < 768) {
        await page.getByRole('button', { name: 'メニュー', exact: true }).click();
        await page.locator('nav').getByRole('link', { name: '資料を請求する', exact: true }).click();
        await expect(page.locator('#request-type')).toHaveValue('資料請求');
      }
    });
  });
}
