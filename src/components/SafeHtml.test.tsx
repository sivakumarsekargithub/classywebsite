import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SafeHtml } from "@/components/SafeHtml";

describe("SafeHtml", () => {
  it("renders allowed legal content tags", () => {
    render(<SafeHtml html="<h2>Policy</h2><p>Hello <strong>Classy</strong><br/>Team</p><ul><li>Secure</li></ul>" />);

    expect(screen.getByRole("heading", { level: 2, name: "Policy" })).toBeInTheDocument();
    expect(screen.getByText("Classy")).toBeInTheDocument();
    expect(screen.getByText("Secure")).toBeInTheDocument();
  });

  it("drops executable and embedded content", () => {
    render(
      <SafeHtml html={'<p>Visible</p><script>alert("xss")</script><iframe src="https://example.com"></iframe>'} />,
    );

    expect(screen.getByText("Visible")).toBeInTheDocument();
    expect(document.querySelector("script")).not.toBeInTheDocument();
    expect(document.querySelector("iframe")).not.toBeInTheDocument();
  });
});
