async (page) => {
const baseUrl = "http://127.0.0.1:8080";
const routes = [
  "/",
  "/who-needs-classy",
  "/why-classy",
  "/resources",
  "/signup",
  "/pricing",
  "/get-the-app",
  "/privacy-policy",
  "/terms-and-conditions",
  "/acceptable-use-policy",
  "/management-users",
  "/management-users/institute",
  "/management-users/chat",
  "/management-users/schedule",
  "/management-users/profile",
];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];
const failures = [];
const samples = [];
const consoleErrors = [];

page.on("pageerror", (error) => {
  consoleErrors.push({ type: "pageerror", message: error.message });
});

page.on("console", (message) => {
  if (message.type() === "error") {
    consoleErrors.push({ type: "console", message: message.text() });
  }
});

for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(200);

    const metrics = await page.evaluate(() => {
      const documentElement = document.documentElement;
      const body = document.body;
      const scrollWidth = Math.max(documentElement.scrollWidth, body.scrollWidth);
      const fixedNodes = Array.from(document.querySelectorAll("header, nav, aside")).map((node) => {
        const rect = node.getBoundingClientRect();
        const style = window.getComputedStyle(node);
        return {
          tag: node.tagName.toLowerCase(),
          visible: style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      });
      const visibleFixedInsideViewport = fixedNodes
        .filter((node) => node.visible)
        .every((node) => node.left >= -2 && node.right <= window.innerWidth + 2);
      const wideElements = Array.from(document.body.querySelectorAll("*"))
        .map((node) => {
          const rect = node.getBoundingClientRect();
          return {
            tag: node.tagName.toLowerCase(),
            text: (node.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 80),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
          };
        })
        .filter((node) => node.width > 0 && (node.left < -4 || node.right > window.innerWidth + 4))
        .slice(0, 8);

      return {
        title: document.title,
        h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim() ?? "",
        overflowX: Math.round(scrollWidth - window.innerWidth),
        visibleFixedInsideViewport,
        wideElements,
      };
    });

    const result = {
      route,
      viewport: viewport.name,
      status: response?.status() ?? null,
      ...metrics,
    };
    samples.push(result);

    if ((response?.status() ?? 500) >= 400 || metrics.overflowX > 2 || !metrics.visibleFixedInsideViewport || metrics.wideElements.length > 0) {
      failures.push(result);
    }
  }
}

return {
  ok: failures.length === 0 && consoleErrors.length === 0,
  routes: routes.length,
  viewports: viewports.map((item) => item.name),
  failures,
  consoleErrors,
  sample: samples.filter((item) => item.viewport === "mobile" && ["/", "/management-users", "/management-users/chat"].includes(item.route)),
};
}
