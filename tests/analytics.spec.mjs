import { test, expect } from '@playwright/test';

const events = page => page.evaluate(() => (window.dataLayer || []).map(args => Array.from(args)));

test('local previews do not load Google Analytics', async ({ page }) => {
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/');
  expect(await page.evaluate(() => typeof window.gtag)).toBe('undefined');
  expect(requests.filter(url => /googletagmanager|google-analytics/.test(url))).toEqual([]);
});

test('production pages initialize once, track CTAs and accepted leads without personal data', async ({ page, baseURL }) => {
  // Serve built files under the production hostname, while blocking real analytics traffic.
  await page.route('https://www.talentkeeper.jp/**', async route => {
    const url = new URL(route.request().url());
    const response = await route.fetch({ url: `${baseURL}${url.pathname}${url.search}` });
    await route.fulfill({ response });
  });
  await page.route('https://www.googletagmanager.com/**', route => route.fulfill({ body: '', contentType: 'application/javascript' }));
  await page.route(/https:\/\/[^/]*google-analytics\.com\//, route => route.abort());
  for (const path of ['/', '/voices/', '/voices/shinnyushain-kinmu-fuan/', '/case/wisemart-retention-support/']) {
    await page.goto(`https://www.talentkeeper.jp${path}?utm_source=note&utm_medium=referral&utm_campaign=retention_signs`);
    await expect.poll(async () => (await events(page)).filter(e => e[0] === 'config')).toEqual([['config', 'G-WW6DQN57R7']]);
    expect(await page.locator('script[src*="googletagmanager.com/gtag/js"]').count()).toBe(1);
  }
  await page.goto('https://www.talentkeeper.jp/');
  await page.locator('section').first().getByRole('link', { name: '導入について相談する' }).click();
  expect((await events(page)).filter(e => e[1] === 'cta_click')).toEqual([
    ['event', 'cta_click', { cta_location: 'landing_section', request_type: 'consultation' }],
  ]);
  let attempts = 0;
  await page.route('https://formspree.io/f/xdapojqn', async route => {
    attempts++;
    await route.fulfill({ status: attempts === 1 ? 500 : 200, contentType: 'application/json', body: '{}' });
  });
  await page.locator('[name="company"]').fill('PRIVATE_COMPANY');
  await page.locator('[name="name"]').fill('PRIVATE_NAME');
  await page.locator('[name="email"]').fill('private@example.invalid');
  const submit = page.locator('button[type="submit"]');
  await submit.click();
  await expect(page.getByText('送信に失敗しました。時間をおいて再度お試しください。')).toBeVisible();
  expect((await events(page)).filter(e => e[1] === 'generate_lead')).toEqual([]);
  await submit.click();
  await expect(page.getByRole('heading', { name: '導入相談を受け付けました' })).toBeVisible();
  expect((await events(page)).filter(e => e[1] === 'generate_lead')).toEqual([
    ['event', 'generate_lead', { request_type: 'consultation' }],
  ]);
  await page.getByRole('button', { name: '別の用件を送る' }).click();
  await page.locator('#request-type').selectOption('資料請求');
  await page.locator('button[type="submit"]').click();
  await expect(page.getByRole('heading', { name: '資料請求を受け付けました' })).toBeVisible();
  expect((await events(page)).filter(e => e[1] === 'generate_lead')).toEqual([
    ['event', 'generate_lead', { request_type: 'consultation' }],
    ['event', 'generate_lead', { request_type: 'document_request' }],
  ]);
  expect(JSON.stringify(await events(page))).not.toMatch(/PRIVATE_|private@example/);
});
