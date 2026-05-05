import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = ref.current;
    if (el) {
      const revEls = el.querySelectorAll(".rev");
      revEls.forEach((r) => observer.observe(r));
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
