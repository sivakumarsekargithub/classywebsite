async (page) => {
  const baseURL = 'http://localhost:3000';
  const outDir = '/Users/Apple/Desktop/sivahietgithub/classywebsite/output/playwright/management-design-followup';
  const errors = [];
  const results = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));

  async function settle() {
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(450);
  }

  async function health(name) {
    const data = await page.evaluate(() => {
      const doc = document.documentElement;
      const viewportWidth = window.innerWidth;
      const activeNav = Array.from(
        document.querySelectorAll('.managementDesignNav a[data-active="true"], .bottomTabBar a[data-active="true"]')
      ).map((item) => item.textContent?.trim() ?? '');
      const sidebar = document.querySelector('.managementDesignSidebar');
      const sidebarBox = sidebar ? sidebar.getBoundingClientRect() : null;
      const visibleControls = Array.from(
        document.querySelectorAll(
          '.managementDesignNav a, .bottomTabBar a, button, input, select, .managementSchoolPill, .managementChatBubbleRow p, .managementDirectoryPanel, .managementScheduleBoard, .managementInstitutionHero'
        )
      ).filter((item) => {
        const rect = item.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
      });
      const clipped = visibleControls.flatMap((item) => {
        const rect = item.getBoundingClientRect();
        const label = item.textContent?.trim().replace(/\s+/g, ' ').slice(0, 70) || item.className || item.tagName;
        if (rect.right > viewportWidth + 2 || rect.left < -2) {
          return [{ label: String(label), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) }];
        }
        return [];
      });
      const chatBubbles = Array.from(document.querySelectorAll('.managementChatBubbleRow p')).map((item) => {
        const rect = item.getBoundingClientRect();
        return { text: item.textContent?.slice(0, 50) ?? '', width: Math.round(rect.width), left: Math.round(rect.left), right: Math.round(rect.right) };
      });
      return {
        activeNav,
        chatBubbles,
        clipped,
        hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        sidebar: sidebarBox ? { left: Math.round(sidebarBox.left), right: Math.round(sidebarBox.right), width: Math.round(sidebarBox.width) } : null
      };
    });
    results.push({ name, ...data });
  }

  async function capture(name) {
    await settle();
    await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: false });
    await health(name);
  }

  async function goto(route) {
    await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
  }

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
  await goto('/management');
  await capture('desktop-home');
  await goto('/management/codes');
  await capture('desktop-institute-students');
  await page.getByRole('button', { name: /Total Classes/i }).click();
  await capture('desktop-institute-classes');
  await page.getByRole('button', { name: /Total Teachers/i }).click();
  await capture('desktop-institute-teachers');
  await goto('/management/communication');
  await capture('desktop-chat-broadcast');
  await page.getByRole('button', { name: /Arts & Music/i }).first().click();
  await capture('desktop-chat-direct');
  await goto('/management/calendar');
  await capture('desktop-schedule');
  await goto('/management/profile');
  await capture('desktop-profile');

  await page.setViewportSize({ width: 430, height: 932 });
  await goto('/management');
  await capture('mobile-home');
  await goto('/management/codes');
  await capture('mobile-institute');
  await goto('/management/communication');
  await page.getByRole('button', { name: /Arts & Music/i }).first().click();
  await capture('mobile-chat-direct');
  await goto('/management/calendar');
  await capture('mobile-schedule');
  await goto('/management/profile');
  await capture('mobile-profile');

  return {
    errors,
    generatedAt: new Date().toISOString(),
    results
  };
}
