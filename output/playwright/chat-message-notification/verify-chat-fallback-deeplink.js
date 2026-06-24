async (page) => {
  const baseURL = 'http://localhost:3000';
  const errors = [];
  const directThreadId = 'cmojistl7000a9ks2qfsi4rg9';
  const directThreadMode = 'DIRECT';

  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));

  async function login() {
    await page.goto(`${baseURL}/login`, { waitUntil: 'networkidle' });
    if (!page.url().includes('/login')) {
      return;
    }
    await page.locator('input[name="email"]').fill('management@classy.local');
    await page.locator('input[name="password"]').fill('Password@123');
    await Promise.all([
      page.waitForURL(/\/management(?:$|[/?#])/, { timeout: 20000 }),
      page.locator('button[type="submit"]').click()
    ]);
  }

  async function selectedThread(formSelector) {
    await page.waitForSelector(`${formSelector} input[name="threadId"]`, { state: 'attached', timeout: 12000 });
    return page.evaluate((selector) => {
      const doc = document.documentElement;
      return {
        hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
        threadId: document.querySelector(`${selector} input[name="threadId"]`)?.value ?? '',
        threadMode: document.querySelector(`${selector} input[name="threadMode"]`)?.value ?? ''
      };
    }, formSelector);
  }

  await page.setViewportSize({ width: 1469, height: 746 });
  await login();

  await page.goto(`${baseURL}/management/communication?threadId=${directThreadId}&threadMode=${directThreadMode}`, { waitUntil: 'domcontentloaded' });
  const management = await selectedThread('form.managementMessageComposer');
  const managementProbe = await page.evaluate(async (thread) => {
    const query = new URLSearchParams({ limit: '5', threadId: thread.threadId, threadMode: thread.threadMode });
    const response = await fetch(`/api/chat/thread?${query.toString()}`, { cache: 'no-store' });
    return { ok: response.ok, status: response.status };
  }, management);

  await page.goto(`${baseURL}/chat?threadId=${directThreadId}&threadMode=${directThreadMode}`, { waitUntil: 'domcontentloaded' });
  const shared = await selectedThread('form.chatComposer');
  const sharedProbe = await page.evaluate(async (thread) => {
    const query = new URLSearchParams({ limit: '5', threadId: thread.threadId, threadMode: thread.threadMode });
    const response = await fetch(`/api/chat/thread?${query.toString()}`, { cache: 'no-store' });
    return { ok: response.ok, status: response.status };
  }, shared);

  return {
    errors,
    management,
    managementFallbackOk: management.threadId === directThreadId && management.threadMode === directThreadMode,
    managementProbe,
    shared,
    sharedFallbackOk: shared.threadId === directThreadId && shared.threadMode === directThreadMode,
    sharedProbe
  };
}
