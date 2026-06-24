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
  { name: "mobile", width: 390, height: 844 },
];
const failures = [];

for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(150);

    const issues = await page.evaluate(() => {
      const isVisible = (element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      };

      const textOf = (element) => (element.textContent ?? "").replace(/\s+/g, " ").trim();
      const labelFor = (element) => {
        if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
          return "";
        }

        if (element.id) {
          return textOf(document.querySelector(`label[for="${CSS.escape(element.id)}"]`) ?? document.createElement("span"));
        }

        return textOf(element.closest("label") ?? document.createElement("span"));
      };

      const controls = Array.from(document.querySelectorAll("a, button, input, textarea, select, [role='button'], [role='tab']"));
      return controls
        .filter((element) => isVisible(element))
        .map((element) => {
          const name =
            element.getAttribute("aria-label") ||
            element.getAttribute("title") ||
            labelFor(element) ||
            textOf(element) ||
            (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement ? element.placeholder : "");

          return {
            tag: element.tagName.toLowerCase(),
            role: element.getAttribute("role") || "",
            type: element.getAttribute("type") || "",
            href: element.getAttribute("href") || "",
            name,
            html: element.outerHTML.replace(/\s+/g, " ").slice(0, 180),
          };
        })
        .filter((control) => !control.name);
    });

    if (issues.length > 0) {
      failures.push({ route, viewport: viewport.name, issues });
    }
  }
}

return {
  ok: failures.length === 0,
  routes: routes.length,
  viewports: viewports.map((item) => item.name),
  failures,
};
}
