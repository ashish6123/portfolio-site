"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type BookPage = {
  id: string;
  label: string;
  // Chapter opener shown on the left-hand page of a desktop spread. Decorative.
  verso?: ReactNode;
  recto: ReactNode;
};

const TURN_MS = 900;
const TEXTUAL = "a, button, img, svg, p, h1, h2, h3, h4, li, dt, dd, span, code, pre, blockquote";

// A stack of leaves. Leaf k carries page k on its front and the opener of page
// k + 1 on its back, so a turned leaf lands on the left as the next chapter's
// opener. Phones show one page at a time and clip the turned leaves away.
export function Book({ pages, endpaper }: { pages: BookPage[]; endpaper?: ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [turning, setTurning] = useState<number | null>(null);
  const currentRef = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const count = pages.length;

  const goTo = useCallback(
    (target: number) => {
      const prev = currentRef.current;
      const next = Math.max(0, Math.min(count - 1, target));
      if (next === prev) return;
      currentRef.current = next;
      setCurrent(next);
      // The leaf that physically moves rides above the rest until it lands.
      setTurning(next > prev ? prev : next);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setTurning(null), TURN_MS);
      const id = pages[next]?.id;
      if (id) history.replaceState(null, "", next === 0 ? location.pathname : `#${id}`);
    },
    [count, pages],
  );

  // Open the page named in the URL hash, and follow in-page #links.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const index = pages.findIndex((p) => p.id === id);
      if (index >= 0) goTo(index);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [goTo, pages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goTo(current - 1);
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(count - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, count, goTo]);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  // A sideways two-finger swipe on a trackpad (or Shift + wheel) turns the page.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let sum = 0;
    let locked = false;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      // Also stops the browser treating the swipe as back or forward navigation.
      e.preventDefault();
      // One gesture turns one page: wait for its momentum to die down before the next.
      clearTimeout(idle);
      idle = setTimeout(() => {
        sum = 0;
        locked = false;
      }, 200);
      if (locked) return;
      sum += e.deltaX;
      if (Math.abs(sum) > 60) {
        locked = true;
        goTo(currentRef.current + (sum > 0 ? 1 : -1));
      }
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      clearTimeout(idle);
    };
  }, [goTo]);

  // On phones the tab row scrolls sideways; keep the current chapter's tab in view.
  useEffect(() => {
    const nav = navRef.current;
    const tab = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !tab || nav.scrollWidth <= nav.clientWidth) return;
    const offset = tab.getBoundingClientRect().left - nav.getBoundingClientRect().left;
    nav.scrollTo({ left: nav.scrollLeft + offset - (nav.clientWidth - tab.offsetWidth) / 2 });
  }, [current]);

  const onClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a");
    const href = a?.getAttribute("href");
    if (!href?.startsWith("#")) return;
    const index = pages.findIndex((p) => p.id === href.slice(1));
    if (index >= 0) {
      e.preventDefault();
      goTo(index);
    }
  };

  // Swipe with a finger anywhere. With a mouse, drag from blank paper: pressing on text,
  // links, buttons or images keeps their usual behaviour, such as selecting text.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && (e.button !== 0 || (e.target as Element).closest(TEXTUAL)))
      return;
    swipeStart.current = { x: e.clientX, y: e.clientY };
  };
  // Stops a drag from blank paper selecting the text it passes over.
  const onMouseDown = (e: React.MouseEvent) => {
    if (swipeStart.current) e.preventDefault();
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
  };

  return (
    <div className="reader">
      <nav ref={navRef} className="chapters" aria-label="Chapters">
        <ol>
          {pages.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === current ? "page" : undefined}
                className="chapter-tab"
              >
                {p.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div
        ref={stageRef}
        className="stage"
        onClick={onClick}
        onPointerDown={onPointerDown}
        onMouseDown={onMouseDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipeStart.current = null)}
      >
        <div className="book">
          {/* Only reachable while the cover is open; turned leaves hide it after that. */}
          <div className="endpaper" inert={current !== 0}>
            {endpaper}
          </div>
          {pages.map((p, k) => {
            const turned = k < current;
            const visible = k === current;
            const z = turning === k ? count + 2 : turned ? k + 1 : count - k;
            return (
              <div
                key={p.id}
                className="leaf"
                data-turned={turned || undefined}
                data-turning={turning === k || undefined}
                data-offstage={(k < current - 1 || k > current) && turning !== k ? true : undefined}
                style={{ zIndex: z }}
                inert={!visible}
              >
                <section
                  id={p.id}
                  className="face front"
                  aria-label={p.label}
                  data-cover={k === 0 || undefined}
                >
                  {p.recto}
                </section>
                <div className="face back" aria-hidden="true">
                  {pages[k + 1]?.verso}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="controls">
        <button
          type="button"
          className="turn"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
        >
          <span aria-hidden="true">←</span> Back
        </button>
        <p className="folio-status" aria-live="polite">
          <span className="sr-only">Page </span>
          {current + 1} / {count}
          <span className="sr-only">: {pages[current]?.label}</span>
        </p>
        <button
          type="button"
          className="turn"
          onClick={() => goTo(current + 1)}
          disabled={current === count - 1}
        >
          Turn page <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
