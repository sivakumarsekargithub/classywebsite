async (page) => {
  const baseURL = 'http://localhost:3000';
  const errors = [];
  const chatThreadResponses = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.url().includes('/api/chat/thread')) {
      chatThreadResponses.push({
        status: response.status(),
        url: response.url()
      });
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
  await page.waitForTimeout(13_500);

  const layout = await page.evaluate(() => {
    const doc = document.documentElement;
    const messages = Array.from(document.querySelectorAll('.managementChatBubbleRow p')).map((node) => node.textContent?.trim() ?? '');
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
      hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
      messageCount: messages.length
    };
  });

  return {
    chatThreadResponses,
    errors,
    layout,
    pollingObserved: chatThreadResponses.filter((response) => response.status === 200).length >= 2
  };
}
