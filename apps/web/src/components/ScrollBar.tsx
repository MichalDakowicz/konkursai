import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "./ScrollBar.module.css";

const MIN_THUMB = 40;
const HIDE_AFTER_MS = 900;

type Metrics = { top: number; height: number; scrollable: boolean };

function measure(): Metrics {
  const doc = document.documentElement;
  const view = window.innerHeight;
  const total = doc.scrollHeight;
  if (total <= view + 1) return { top: 0, height: 0, scrollable: false };
  const track = view - 8;
  const height = Math.max(MIN_THUMB, (view / total) * track);
  const top = 4 + (window.scrollY / (total - view)) * (track - height);
  return { top, height, scrollable: true };
}

// Własny pasek przewijania jako nakładka. Natywny jest ukryty w global.css, więc strona nie traci
// szerokości, a elementy przyklejone do krawędzi (Pestka) liczą pozycję od samego brzegu okna.
export function ScrollBar() {
  const [m, setM] = useState<Metrics>(measure);
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const hideTimer = useRef<number>();
  const drag = useRef<{ startY: number; startScroll: number } | null>(null);

  const wake = useCallback(() => {
    setActive(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setActive(false), HIDE_AFTER_MS);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setM(measure()));
    };
    const onScroll = () => {
      update();
      wake();
    };
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [wake]);

  function onThumbDown(e: PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startY: e.clientY, startScroll: window.scrollY };
    setDragging(true);
  }

  function onThumbMove(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const doc = document.documentElement;
    const track = window.innerHeight - 8 - m.height;
    const ratio = (doc.scrollHeight - window.innerHeight) / track;
    window.scrollTo(0, drag.current.startScroll + (e.clientY - drag.current.startY) * ratio);
  }

  function onThumbUp() {
    drag.current = null;
    setDragging(false);
    wake();
  }

  // Kliknięcie w tor przewija o ekran w stronę kliknięcia, jak w natywnym pasku.
  function onTrackDown(e: PointerEvent<HTMLDivElement>) {
    const dir = e.clientY < m.top ? -1 : 1;
    window.scrollBy({ top: dir * window.innerHeight * 0.85, behavior: "smooth" });
  }

  if (!m.scrollable) return null;

  return (
    <div
      className={`${styles.track} ${active || dragging ? styles.active : ""}`}
      onPointerDown={onTrackDown}
      onPointerEnter={wake}
      aria-hidden="true"
    >
      <div
        className={`${styles.thumb} ${dragging ? styles.dragging : ""}`}
        style={{ transform: `translateY(${m.top}px)`, height: m.height }}
        onPointerDown={onThumbDown}
        onPointerMove={onThumbMove}
        onPointerUp={onThumbUp}
        onPointerCancel={onThumbUp}
      />
    </div>
  );
}
