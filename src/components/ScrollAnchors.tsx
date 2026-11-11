"use client";

import { useEffect } from "react";

function scrollToSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function cleanUrlHash() {
  const path = window.location.pathname + window.location.search;
  if (window.location.hash || window.location.href.endsWith("#")) {
    history.replaceState(null, "", path);
  }
}

export function ScrollAnchors() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      requestAnimationFrame(() => scrollToSection(hash));
      cleanUrlHash();
    }

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest(
        "a",
      ) as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const onHome = window.location.pathname === "/";

      if (href.startsWith("#") && href !== "#") {
        event.preventDefault();
        scrollToSection(href.slice(1));
        cleanUrlHash();
        return;
      }

      if (onHome && href.startsWith("/#")) {
        event.preventDefault();
        scrollToSection(href.slice(2));
        cleanUrlHash();
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
