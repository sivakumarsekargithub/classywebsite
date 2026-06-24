async (page) => {
const baseUrl = "http://127.0.0.1:8080";
const routes = [
  "/management-users",
  "/management-users/institute",
  "/management-users/chat",
  "/management-users/schedule",
  "/management-users/profile",
];
const expectedLabels = ["Home", "Institute", "Chat", "Schedule", "Profile"];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const failures = [];
const checks = [];

function hasSameLabels(labels) {
  return expectedLabels.every((label) => labels.includes(label));
}

for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(250);

    const metrics = await page.evaluate((expected) => {
      const documentElement = document.documentElement;
      const body = document.body;
      const sidebar = document.querySelector("aside");
      const bottomNav = document.querySelector('nav[aria-label="Management bottom navigation"]');
      const sidebarStyle = sidebar ? window.getComputedStyle(sidebar) : null;
      const bottomNavStyle = bottomNav ? window.getComputedStyle(bottomNav) : null;
      const sidebarRect = sidebar && sidebarStyle?.display !== "none" ? sidebar.getBoundingClientRect() : null;
      const bottomNavRect = bottomNav && bottomNavStyle?.display !== "none" ? bottomNav.getBoundingClientRect() : null;
      const activeItems = document.querySelectorAll('[aria-current="page"]').length;
      const visibleNav = sidebarRect ? sidebar : bottomNavRect ? bottomNav : null;
      const labels = Array.from(visibleNav?.querySelectorAll("a") ?? [])
        .map((item) => item.textContent?.replace(/\s+/g, " ").trim())
        .filter(Boolean);
      const cardRects = Array.from(document.querySelectorAll("main section, main article"))
        .slice(0, 12)
        .map((node) => node.getBoundingClientRect());
      const cardsInsideViewport = cardRects.every((rect) => rect.left >= -1 && rect.right <= window.innerWidth + 1);
      const scrollWidth = Math.max(documentElement.scrollWidth, body.scrollWidth);
      const mainRect = document.querySelector("main")?.getBoundingClientRect() ?? null;

      return {
        activeItems,
        bottomNav: bottomNavRect
          ? {
              bottom: Math.round(window.innerHeight - bottomNavRect.bottom),
              left: Math.round(bottomNavRect.left),
              right: Math.round(bottomNavRect.right),
              width: Math.round(bottomNavRect.width),
            }
          : null,
        cardsInsideViewport,
        labels,
        mainLeft: mainRect ? Math.round(mainRect.left) : null,
        overflowX: Math.round(scrollWidth - window.innerWidth),
        sidebar: sidebarRect
          ? {
              bottom: Math.round(window.innerHeight - sidebarRect.bottom),
              left: Math.round(sidebarRect.left),
              right: Math.round(sidebarRect.right),
              width: Math.round(sidebarRect.width),
            }
          : null,
        title: document.querySelector("main h1, main h2")?.textContent?.trim() ?? "",
        expected,
      };
    }, expectedLabels);

    const isDesktop = viewport.width >= 1024;
    const labelOk = hasSameLabels(metrics.labels);
    const sidebarOk = isDesktop
      ? Boolean(metrics.sidebar && metrics.sidebar.left === 0 && metrics.sidebar.bottom === 0 && metrics.sidebar.width >= 280)
      : metrics.sidebar === null;
    const mobileNavOk = isDesktop
      ? metrics.bottomNav === null
      : Boolean(metrics.bottomNav && metrics.bottomNav.left === 0 && metrics.bottomNav.bottom === 0);
    const overflowOk = metrics.overflowX <= 2;
    const activeOk = metrics.activeItems >= 1;
    const cardsOk = metrics.cardsInsideViewport;

    checks.push({ route, viewport: viewport.name, ...metrics, labelOk, sidebarOk, mobileNavOk, overflowOk, activeOk, cardsOk });

    if (!labelOk || !sidebarOk || !mobileNavOk || !overflowOk || !activeOk || !cardsOk) {
      failures.push({ route, viewport: viewport.name, labelOk, sidebarOk, mobileNavOk, overflowOk, activeOk, cardsOk, metrics });
    }
  }
}

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`${baseUrl}/management-users/chat`, { waitUntil: "networkidle" });
await page.getByRole("tab", { name: "Broadcast" }).click();
const broadcastText = `Playwright broadcast ${Date.now()}`;
await page.getByPlaceholder("Type your announcement...").fill(broadcastText);
await page.getByRole("button", { name: /Send Broadcast/i }).click();
await page.waitForTimeout(400);
const sentVisible = await page.getByText(broadcastText).first().isVisible();

if (!sentVisible) {
  failures.push({ route: "/management-users/chat", viewport: "desktop", broadcastHistoryVisible: false });
}

return {
  ok: failures.length === 0,
  checkedRoutes: routes.length,
  checkedViewports: viewports.map((item) => item.name),
  failures,
  sample: checks.filter((item) => item.route === "/management-users" || item.route === "/management-users/chat"),
  broadcastHistoryVisible: sentVisible,
};
}
