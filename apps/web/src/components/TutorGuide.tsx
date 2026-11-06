import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { TutorAvatar } from "./TutorAvatar";
import { resetTour, useTutor, type Hint } from "./TutorContext";
import styles from "./TutorGuide.module.css";

const AV = 48;
const GAP = 12;

// Szerokość bez pionowego paska przewijania, żeby avatar ani dymek nie wypychały strony w bok.
const viewW = () => document.documentElement.clientWidth;

type Placement = "right" | "left" | "below" | "above";
type Spot = { x: number; y: number; placement: Placement; shift: number; up: boolean };

function findTarget(target: Hint["target"]): HTMLElement | null {
  const ids = Array.isArray(target) ? target : [target];
  for (const id of ids) {
    const el = document.querySelector<HTMLElement>(`[data-tutor="${id}"]`);
    if (el && el.getClientRects().length > 0) return el;
  }
  return null;
}

function bubbleWidth() {
  return Math.min(300, viewW() - 32);
}

// Wybiera stronę dymka tam, gdzie mieści się w oknie. Współrzędne avatara są w układzie dokumentu.
function spotFor(x: number, y: number): Spot {
  const vx = x - window.scrollX;
  const vy = y - window.scrollY;
  const w = bubbleWidth();
  let placement: Placement;
  if (viewW() - (vx + AV) - GAP - 16 >= w) placement = "right";
  else if (vx - GAP - 16 >= w) placement = "left";
  else placement = window.innerHeight - (vy + AV) > 240 ? "below" : "above";
  // Przy dymku pod lub nad avatarem przesuwamy go w poziomie, żeby nie wychodził poza ekran.
  const shift = Math.min(Math.max(16 - vx, -w + AV), viewW() - 16 - w - vx);
  // Dymek z boku przy dole ekranu otwiera się w górę.
  const up = window.innerHeight - vy < 240;
  return { x, y, placement, shift, up };
}

export function TutorGuide() {
  const tutor = useTutor();
  const { guide, summon, isOpen, next, dismiss, open, startTour, showHints, summonAt } = tutor;
  const hint = guide ? guide.hints[guide.index] : null;
  const navigate = useNavigate();
  const location = useLocation();

  const [spot, setSpot] = useState<Spot | null>(null);
  const [hop, setHop] = useState(0);
  const [talking, setTalking] = useState(false);
  const focused = useRef<HTMLElement | null>(null);
  const hasSpot = useRef(false);

  const clearFocus = () => {
    focused.current?.classList.remove("tutor-focus");
    focused.current = null;
  };

  const moveTo = useCallback((x: number, y: number) => {
    const clampedX = Math.min(Math.max(x, window.scrollX + 8), window.scrollX + viewW() - AV - 8);
    const clampedY = Math.max(y, 8);
    setSpot(spotFor(clampedX, clampedY));
    // Pierwsze pojawienie to wyskoczenie w miejscu, kolejne to skok z poprzedniego miejsca.
    if (hasSpot.current) setHop((h) => h + 1);
    hasSpot.current = true;
  }, []);

  // Siada na prawym górnym rogu elementu, który komentuje. Gdy nad elementem nie ma miejsca
  // (np. pasek nawigacji), siada pod nim, żeby nie zasłaniać jego treści.
  const perchOn = useCallback(
    (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const roomAbove = r.top - AV * 0.7 >= 8;
      moveTo(r.right + window.scrollX - AV * 0.75, (roomAbove ? r.top - AV * 0.7 : r.bottom + 4) + window.scrollY);
    },
    [moveTo],
  );

  useLayoutEffect(() => {
    clearFocus();
    if (isOpen || (!hint && !summon)) {
      setSpot(null);
      hasSpot.current = false;
      return;
    }
    if (summon) {
      moveTo(summon.x + 12, summon.y - AV / 2);
      return;
    }
    const el = hint && findTarget(hint.target);
    if (!el) {
      next();
      return;
    }
    const show = () => {
      el.classList.add("tutor-focus");
      focused.current = el;
      perchOn(el);
    };
    const r = el.getBoundingClientRect();
    if (r.top >= 96 && r.bottom <= window.innerHeight - 120) {
      show();
      return;
    }
    // Sama z siebie Pestka nie przewija strony: czeka, aż uczeń dojdzie do elementu.
    // Przewija tylko wtedy, gdy uczeń o to poprosił (przewodnik, „Dalej”, „Co dziś robić?”).
    const passive = guide?.kind === "hint" && guide.index === 0 && !guide.key.startsWith("ask-");
    if (passive) {
      setSpot(null);
      hasSpot.current = false;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          show();
        },
        { rootMargin: "-96px 0px -120px 0px", threshold: 1 },
      );
      io.observe(el);
      return () => io.disconnect();
    }
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    const t = window.setTimeout(show, 420);
    return () => window.clearTimeout(t);
  }, [hint, summon, isOpen, guide, moveTo, perchOn, next]);

  useEffect(() => clearFocus, []);

  // Układ strony może się zmienić (rozwinięta lista, obrót telefonu), więc poprawiamy pozycję.
  useEffect(() => {
    if (!hint) return;
    const onResize = () => focused.current && perchOn(focused.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hint, perchOn]);

  useEffect(() => {
    if (!spot) return;
    setTalking(true);
    const t = window.setTimeout(() => setTalking(false), 1600);
    return () => window.clearTimeout(t);
  }, [hop, spot === null]);

  // Prawy przycisk (na telefonie przytrzymanie) przywołuje tutora do kursora.
  // Pola tekstowe i zaznaczony tekst zostawiamy przeglądarce, żeby dało się kopiować i wklejać.
  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (isOpen || t.closest("input, textarea, select, [contenteditable='true']")) return;
      if (String(window.getSelection() ?? "").trim()) return;
      if (t.closest(`.${styles.guide}`)) return;
      e.preventDefault();
      const about = t.closest<HTMLElement>("[data-tutor-about]")?.dataset.tutorAbout ?? null;
      summonAt({ x: e.pageX, y: e.pageY, about });
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    document.addEventListener("contextmenu", onContext);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("contextmenu", onContext);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, summonAt, dismiss]);

  if (!spot) return null;

  const isTour = guide?.kind === "tour";
  const last = guide ? guide.index === guide.hints.length - 1 : false;
  const hasToday = !!document.querySelector('[data-tutor="today-cta"]');
  const bubbleStyle: CSSProperties =
    spot.placement === "below" || spot.placement === "above" ? { left: spot.shift, width: bubbleWidth() } : { width: bubbleWidth() };

  function replayTour() {
    resetTour();
    if (location.pathname === "/") startTour();
    else navigate("/");
  }

  return (
    <div className={styles.guide} style={{ left: spot.x, top: spot.y }}>
      <button
        key={`a${hop}`}
        type="button"
        className={`${styles.avatar} ${hop === 0 ? styles.enter : styles.hop}`}
        onClick={open}
        aria-label="Porozmawiaj z Pestką"
      >
        <TutorAvatar size={AV} state={talking ? "talking" : tutor.state} />
      </button>

      <div key={`b${hop}`} className={`${styles.bubble} ${styles[spot.placement]} ${spot.up ? styles.up : ""}`} style={bubbleStyle} role="status">
        <button type="button" className={styles.close} onClick={dismiss} aria-label="Odpraw Pestkę">
          <X size={16} />
        </button>

        {summon ? (
          <>
            <p className={styles.text}>{summon.about ?? "Jestem. W czym ci pomóc?"}</p>
            <div className={styles.actions}>
              <button type="button" className="btn btn-primary btn-sm" onClick={open}>
                Porozmawiajmy
              </button>
              {hasToday && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() =>
                    showHints(`ask-${Date.now()}`, [{ target: "today-cta", text: "To polecam na dziś. Krótko i w twoim najsłabszym miejscu." }])
                  }
                >
                  Co dziś robić?
                </button>
              )}
              <button type="button" className="btn btn-ghost btn-sm" onClick={replayTour}>
                Przewodnik
              </button>
            </div>
          </>
        ) : (
          hint && (
            <>
              {isTour && guide && (
                <span className={styles.step}>
                  Przewodnik · {guide.index + 1} z {guide.hints.length}
                </span>
              )}
              <p className={styles.text}>{hint.text}</p>
              <div className={styles.actions}>
                {hint.waitFor === "summon" ? (
                  <span className={styles.wait}>Czekam na prawy przycisk…</span>
                ) : (
                  <button type="button" className="btn btn-primary btn-sm" onClick={next}>
                    {last ? "Jasne" : "Dalej"}
                  </button>
                )}
                {isTour && !last && (
                  <button type="button" className={styles.skip} onClick={dismiss}>
                    Pomiń przewodnik
                  </button>
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
