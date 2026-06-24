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

  async function selectMathThread() {
    await page.getByRole('button', { name: /Mathematics Department/i }).first().click();
    await page.waitForTimeout(600);
    return page.evaluate(() => ({
      threadId: document.querySelector('form.managementMessageComposer input[name="threadId"]')?.value ?? '',
      threadMode: document.querySelector('form.managementMessageComposer input[name="threadMode"]')?.value ?? ''
    }));
  }

  await page.setViewportSize({ width: 1469, height: 746 });
  await login();
  await page.goto(`${baseURL}/management/communication`, { waitUntil: 'networkidle' });

  const firstThread = await selectMathThread();
  const threadProbe = await page.evaluate(async (thread) => {
    const query = new URLSearchParams({ limit: '5', threadId: thread.threadId, threadMode: thread.threadMode });
    const response = await fetch(`/api/chat/thread?${query.toString()}`, { cache: 'no-store' });
    const body = await response.json().catch(() => null);
    return {
      messageCount: Array.isArray(body?.messages) ? body.messages.length : null,
      ok: response.ok,
      status: response.status
    };
  }, firstThread);

  const stamp = `persisted-thread-${Date.now()}`;
  await page.locator('form.managementMessageComposer input[name="content"]').fill(stamp);
  await page.locator('form.managementMessageComposer button[type="submit"]').click();
  await page.waitForFunction(
    (text) => Array.from(document.querySelectorAll('.managementChatBubbleRow p')).some((node) => node.textContent?.trim() === text),
    stamp,
    { timeout: 12000 }
  );

  await page.reload({ waitUntil: 'networkidle' });
  const reloadedThread = await selectMathThread();
  await page.waitForFunction(
    (text) => Array.from(document.querySelectorAll('.managementChatBubbleRow p')).some((node) => node.textContent?.trim() === text),
    stamp,
    { timeout: 12000 }
  );

  const layout = await page.evaluate(() => {
    const doc = document.documentElement;
    const clipped = Array.from(document.querySelectorAll('.managementDesignNav a, button, input, .managementChatBubbleRow p'))
      .filter((item) => {
        const rect = item.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
      })
      .flatMap((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.left < -2 || rect.right > window.innerWidth + 2) {
          return [{ left: Math.round(rect.left), right: Math.round(rect.right), text: item.textContent?.trim().slice(0, 80) ?? item.tagName }];
        }
        return [];
      });
    return {
      clipped,
      hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth + 1
    };
  });

  return {
    errors,
    firstThread,
    layout,
    persistedMessageVisibleAfterReload: true,
    reloadedThread,
    stamp,
    threadProbe
  };
}
