import { Fragment, type ReactNode } from "react";

interface SafeHtmlProps {
  html: string;
}

const allowedTags = new Set(["br", "h2", "h3", "li", "ol", "p", "strong", "ul"]);
const blockedTags = new Set(["base", "embed", "form", "iframe", "link", "meta", "object", "script", "style"]);

function renderNode(node: ChildNode, key: string): ReactNode {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const element = node as HTMLElement;
  const tagName = element.tagName.toLowerCase();

  if (blockedTags.has(tagName)) {
    return null;
  }

  const children = Array.from(element.childNodes).map((child, index) => renderNode(child, `${key}-${index}`));

  if (!allowedTags.has(tagName)) {
    return <Fragment key={key}>{children}</Fragment>;
  }

  switch (tagName) {
    case "br":
      return <br key={key} />;
    case "h2":
      return <h2 key={key}>{children}</h2>;
    case "h3":
      return <h3 key={key}>{children}</h3>;
    case "li":
      return <li key={key}>{children}</li>;
    case "ol":
      return <ol key={key}>{children}</ol>;
    case "p":
      return <p key={key}>{children}</p>;
    case "strong":
      return <strong key={key}>{children}</strong>;
    case "ul":
      return <ul key={key}>{children}</ul>;
    default:
      return null;
  }
}

function renderSafeHtml(html: string): ReactNode[] {
  if (typeof DOMParser === "undefined") {
    return [html];
  }

  const document = new DOMParser().parseFromString(html, "text/html");
  return Array.from(document.body.childNodes).map((node, index) => renderNode(node, `safe-html-${index}`));
}

export function SafeHtml({ html }: SafeHtmlProps) {
  return <>{renderSafeHtml(html)}</>;
}
