import { useState } from "react";
import { Link } from "react-router-dom";
import { useLayout } from "../components/AppLayout";
import { useTutor } from "../components/TutorContext";
import {
  continueItem,
  daysUntil,
  knowledgeMap,
  lastSheet,
  recommendation,
  reviews,
  skills,
  student,
} from "../data/demo";
import styles from "./Dashboard.module.css";

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Dashboard() {
  const { subject } = useLayout();
  const { open: openTutor } = useTutor();
  const [showAlternatives, setShowAlternatives] = useState(false);
  const days = daysUntil(student.examDate);

  return (
    <main className={`container ${styles.page}`}>
      <section className={styles.hero}>
        <span className="label">{subject}</span>
        <h1 className="display">
          <span className={styles.line}>Cześć, {student.name}.</span>
          <span className={`accent ${styles.line}`}>Do matury {days} dni.</span>
        </h1>
      </section>

      <section className={styles.top}>
        {/* Jedyna karta na pulpicie: rekomendacja to główne działanie, więc dostaje wyróżnienie. */}
        <article className={styles.today} aria-labelledby="today-title">
          <span className={styles.todayLabel}>Dziś warto</span>
          <h2 id="today-title" className="h1">
            {recommendation.skill}
          </h2>
          <p className={styles.reason}>{recommendation.reason}</p>
          <div className={styles.actions}>
            <button type="button" className="btn btn-primary">
              {recommendation.format} · {recommendation.minutes} min
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              aria-expanded={showAlternatives}
              onClick={() => setShowAlternatives((v) => !v)}
            >
              Inna propozycja
            </button>
          </div>
          {showAlternatives && (
            <ul className={styles.alternatives}>
              {recommendation.alternatives.map((a) => (
                <li key={a.skill}>
                  <button type="button">
                    <span>{a.skill}</span>
                    <span className="muted small">
                      {a.format} · {a.minutes} min
                    </span>
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={openTutor}>
                  <span>Porozmawiaj o tym z tutorem</span>
                  <span className="muted small">pytania zamiast wykładu</span>
                </button>
              </li>
            </ul>
          )}
        </article>

        <div className={styles.side}>
          <div className={styles.block}>
            <span className="label">Powtórki</span>
            <p className="h2">{reviews.count} umiejętności wracają dziś</p>
            <p className="muted">ok. {reviews.minutes} min, zanim zaczną zanikać</p>
            <Link to="/powtorki" className="btn btn-secondary btn-sm">
              Zacznij powtórki
            </Link>
          </div>
          <div className={styles.block}>
            <span className="label">Kontynuuj</span>
            <p className="h3">
              {continueItem.title} <span className="muted">· {continueItem.step}</span>
            </p>
            <div className={styles.progress} role="progressbar" aria-valuenow={continueItem.progress} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ width: `${continueItem.progress}%` }} />
            </div>
            <Link to="/nauka" className="link">
              Wróć do pracy <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="skills-title">
        <div className={styles.sectionHead}>
          <h2 id="skills-title" className="h2">
            Mapa umiejętności
          </h2>
          <Link to="/umiejetnosci" className="link">
            Pełna mapa <Arrow />
          </Link>
        </div>
        <ul className={styles.skills}>
          {skills.map((s) => (
            <li key={s.name} className={styles.skill}>
              <span className={styles.skillName}>{s.name}</span>
              <span className={styles.bar} aria-hidden="true">
                <span style={{ width: `${s.mastery}%` }} data-level={s.mastery < 50 ? "low" : s.mastery < 75 ? "mid" : "high"} />
              </span>
              <span className={styles.pct}>{s.mastery}%</span>
              <span className={styles.note}>{s.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.columns}>
        <div className={styles.column}>
          <span className="label">Wybierz temat</span>
          <p className="muted">Ucz się czegoś spoza rekomendacji.</p>
          <label htmlFor="topic" className="visually-hidden">
            Szukaj umiejętności
          </label>
          <input id="topic" className="input" placeholder="Szukaj umiejętności…" />
        </div>
        <div className={styles.column}>
          <span className="label">Ostatni arkusz</span>
          <p className={styles.stat}>
            {lastSheet.score}
            <span>/{lastSheet.max}</span>
          </p>
          <p className="muted small">{lastSheet.title}</p>
          <Link to="/arkusze" className="link">
            Arkusze i egzamin <Arrow />
          </Link>
        </div>
        <div className={styles.column}>
          <span className="label">Mapa wiedzy</span>
          <p className={styles.stat}>{knowledgeMap.nodes}</p>
          <p className="muted small">węzłów, {knowledgeMap.newLinks} nowe połączenia od wczoraj</p>
          <Link to="/nauka" className="link">
            Otwórz notatnik <Arrow />
          </Link>
        </div>
      </section>
    </main>
  );
}
