"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };

/** True when the visitor asked the OS to reduce motion. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Standard scroll reveal: fades + lifts `[data-reveal]` targets inside a section. */
export function revealIn(
  scope: HTMLElement,
  options: { stagger?: number; y?: number; start?: string } = {}
) {
  const { stagger = 0.09, y = 42, start = "top 82%" } = options;
  const targets = scope.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!targets.length) return;

  // CSS already forces [data-reveal] visible under reduced motion.
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return;
  }

  const tween = gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger,
      scrollTrigger: {
        trigger: scope,
        start,
        once: true,
      },
    }
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

/** Count-up for elements marked with `data-count`. */
export function countUp(scope: HTMLElement) {
  const nodes = scope.querySelectorAll<HTMLElement>("[data-count]");
  if (!nodes.length) return;

  const render = (node: HTMLElement) => {
    const target = parseFloat(node.dataset.count || "0");
    const decimals = (node.dataset.count.split(".")[1] || "").length;
    node.textContent =
      decimals > 0
        ? target.toFixed(decimals)
        : Math.round(target).toLocaleString("en-US");
  };

  if (prefersReducedMotion()) {
    nodes.forEach(render);
    return;
  }

  const ctx = gsap.context(() => {
    nodes.forEach((node) => {
      const target = parseFloat(node.dataset.count || "0");
      const decimals = (node.dataset.count.split(".")[1] || "").length;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: node, start: "top 88%", once: true },
        onUpdate: () => {
          node.textContent =
            decimals > 0
              ? obj.v.toFixed(decimals)
              : Math.round(obj.v).toLocaleString("en-US");
        },
      });
    });
  }, scope);

  return () => ctx.revert();
}
