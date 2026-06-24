async (page) => {
  const baseURL = 'http://localhost:3000';
  const errors = [];

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

  function readThreadState(formSelector) {
    return page.evaluate((selector) => {
      const url = new URL(window.location.href);
      return {
        formThreadId: document.querySelector(`${selector} input[name="threadId"]`)?.value ?? '',
        formThreadMode: document.querySelector(`${selector} input[name="threadMode"]`)?.value ?? '',
        urlThreadId: url.searchParams.get('threadId') ?? '',
        urlThreadMode: url.searchParams.get('threadMode') ?? ''
      };
    }, formSelector);
  }

  await page.setViewportSize({ width: 1469, height: 746 });
  await login();

  await page.goto(`${baseURL}/management/communication`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: /Mathematics Department/i }).first().click();
  await page.waitForSelector('form.managementMessageComposer input[name="threadId"]', { state: 'attached' });
  const managementGroup = await readThreadState('form.managementMessageComposer');
  await page.getByRole('button', { name: /Broadcast Feed/i }).click();
  const managementBroadcastUrl = await page.evaluate(() => window.location.href);

  await page.goto(`${baseURL}/chat`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('form.chatComposer input[name="threadId"]', { state: 'attached' });
  await page.getByRole('button', { name: /Grade 10-B Group/i }).first().click();
  const sharedGroup = await readThreadState('form.chatComposer');

  return {
    errors,
    managementBroadcastCleared: !managementBroadcastUrl.includes('threadId='),
    managementGroup,
    managementGroupSynced: managementGroup.formThreadId === managementGroup.urlThreadId && managementGroup.urlThreadMode === 'GROUP',
    sharedGroup,
    sharedGroupSynced: sharedGroup.formThreadId === sharedGroup.urlThreadId && sharedGroup.urlThreadMode === 'GROUP'
  };
}
