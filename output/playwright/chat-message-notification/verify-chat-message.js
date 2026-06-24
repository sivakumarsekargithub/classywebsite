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

  async function measureLayout() {
    return page.evaluate(() => {
      const doc = document.documentElement;
      const sidebar = document.querySelector('.managementDesignSidebar')?.getBoundingClientRect();
      const clipped = Array.from(document.querySelectorAll('.managementDesignNav a, button, input, .managementChatBubbleRow p'))
        .filter((item) => {
          const rect = item.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
        })
        .flatMap((item) => {
          const rect = item.getBoundingClientRect();
          if (rect.left < -2 || rect.right > window.innerWidth + 2) {
            return [
              {
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                text: item.textContent?.trim().replace(/\s+/g, ' ').slice(0, 80) || item.tagName
              }
            ];
          }
          return [];
        });

      return {
        clipped,
        hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
        sidebar: sidebar
          ? {
              left: Math.round(sidebar.left),
              right: Math.round(sidebar.right),
              width: Math.round(sidebar.width)
            }
          : null
      };
    });
  }

  await page.setViewportSize({ width: 1469, height: 746 });
  await login();
  await page.goto(`${baseURL}/management/communication`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Mathematics Department/i }).first().click();

  const stamp = `web-listed-${Date.now()}`;
  await page.locator('form.managementMessageComposer input[name="content"]').fill(stamp);
  await page.locator('form.managementMessageComposer button[type="submit"]').click();
  await page.waitForFunction(
    (text) => Array.from(document.querySelectorAll('.managementChatBubbleRow p')).some((node) => node.textContent?.trim() === text),
    stamp,
    { timeout: 12000 }
  );

  const desktopLayout = await measureLayout();
  const notificationProxy = await page.evaluate(async () => {
    const response = await fetch('/api/notifications/inbox?limit=1', { cache: 'no-store' });
    const body = await response.json().catch(() => null);
    return {
      body,
      ok: response.ok,
      status: response.status
    };
  });

  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto(`${baseURL}/management/communication`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Mathematics Department/i }).first().click();
  const mobileLayout = await measureLayout();

  return {
    desktopLayout,
    errors,
    mobileLayout,
    notificationProxy,
    sentMessageVisible: true,
    stamp
  };
}
