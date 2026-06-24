async (page) => {
  const baseURL = 'http://localhost:3000';
  const errors = [];
  const threadId = 'seed-chat-cls-10b-5931';
  const threadMode = 'GROUP';

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
      const clipped = Array.from(document.querySelectorAll('button, input, .managementChatBubbleRow p, .chatMessageRow p'))
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
        hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
        threadId: document.querySelector(`${selector} input[name="threadId"]`)?.value ?? '',
        threadMode: document.querySelector(`${selector} input[name="threadMode"]`)?.value ?? ''
      };
    }, formSelector);
  }

  await page.setViewportSize({ width: 1469, height: 746 });
  await login();

  await page.goto(`${baseURL}/management/communication?threadId=${threadId}&threadMode=${threadMode}`, { waitUntil: 'domcontentloaded' });
  const management = await selectedThread('form.managementMessageComposer');

  await page.goto(`${baseURL}/chat?threadId=${threadId}&threadMode=${threadMode}`, { waitUntil: 'domcontentloaded' });
  const shared = await selectedThread('form.chatComposer');

  return {
    errors,
    management,
    managementDeepLinkOk: management.threadId === threadId && management.threadMode === threadMode,
    shared,
    sharedDeepLinkOk: shared.threadId === threadId && shared.threadMode === threadMode
  };
}
