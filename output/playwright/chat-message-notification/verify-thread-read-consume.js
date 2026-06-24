async (page) => {
  const baseURL = 'http://localhost:3000';
  const errors = [];
  const threadLoads = [];
  const threadReads = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/api/chat/thread/read')) {
      const body = await response.json().catch(() => null);
      threadReads.push({ body, status: response.status(), url });
    } else if (url.includes('/api/chat/thread?')) {
      threadLoads.push({ status: response.status(), url });
    }
  });

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

  await page.setViewportSize({ width: 1469, height: 746 });
  await login();
  await page.goto(`${baseURL}/management/communication`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Mathematics Department/i }).first().click();
  await page.waitForTimeout(1800);

  const directProbe = await page.evaluate(async () => {
    const threadId = document.querySelector('form.managementMessageComposer input[name="threadId"]')?.value ?? '';
    const threadMode = document.querySelector('form.managementMessageComposer input[name="threadMode"]')?.value ?? '';
    const response = await fetch('/api/chat/thread/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threadId, threadMode })
    });
    return {
      body: await response.json().catch(() => null),
      ok: response.ok,
      status: response.status,
      threadId,
      threadMode
    };
  });

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
    directProbe,
    errors,
    layout,
    threadLoadOk: threadLoads.some((response) => response.status === 200),
    threadLoads,
    threadReadOk: threadReads.some((response) => response.status === 200),
    threadReads
  };
}
