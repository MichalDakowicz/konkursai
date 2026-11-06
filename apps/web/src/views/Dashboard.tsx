import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, Navigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  CirclePlay,
  FileText,
  LayoutGrid,
  Network,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTutor, isTourDone, type Hint } from "../components/TutorContext";
import { SubjectIcon, formatIcons } from "../components/icons";
import {
  averageMastery,
  daysUntil,
  formatDate,
  getSubject,
  knowledgeMap,
  nearestExam,
  student,
  subjects,
  topPick,
  type Subject,
} from "../data/demo";
import styles from "./Dashboard.module.css";

function Kicker({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <span className={styles.kicker}>
      <Icon size={14} strokeWidth={2.2} aria-hidden="true" />
      {children}
    </span>
  );
}

function SubjectBar({ active }: { active?: string }) {
  return (
    <nav
      className={styles.subjectBar}
      aria-label="Przedmioty"
      data-tutor="subjects"
      data-tutor-about="Tu wybierasz przedmiot. „Wszystkie” to pulpit ogólny, a przedmiot zawęża pulpit tylko do jego danych."
    >
      <NavLink to="/" end className={({ isActive }) => `${styles.chip} ${isActive ? styles.chipActive : ""}`}>
        <span className={styles.chipIcon}>
          <LayoutGrid size={14} aria-hidden="true" />
        </span>
        Wszystkie
      </NavLink>
      {subjects.map((s) => (
        <NavLink key={s.id} to={`/przedmiot/${s.id}`} className={`${styles.chip} ${active === s.id ? styles.chipActive : ""}`}>
          <SubjectIcon subject={s} size="sm" />
          {s.name}
        </NavLink>
      ))}
      <button type="button" className={`${styles.chip} ${styles.chipAdd}`}>
        <Plus size={16} aria-hidden="true" />
        Dodaj przedmiot
      </button>
    </nav>
  );
}

function Mastery({ value }: { value: number }) {
  const level = value < 50 ? "low" : value < 75 ? "mid" : "high";
  return (
    <span className={styles.bar} aria-hidden="true">
      <span style={{ width: `${value}%` }} data-level={level} />
    </span>
  );
}

function Today({ subject, showSubject }: { subject: Subject; showSubject: boolean }) {
  const { open: openTutor } = useTutor();
  const [showAlternatives, setShowAlternatives] = useState(false);
  const rec = subject.recommendation;
  const FormatIcon = formatIcons[rec.format];

  return (
    // Jedyna karta na pulpicie: rekomendacja to główne działanie, więc dostaje wyróżnienie.
    <article
      className={styles.today}
      aria-labelledby="today-title"
      data-tutor-about="To moja propozycja na dziś. Wybieram ją z mapy umiejętności: niskie opanowanie, dawno nie ćwiczone i duża waga na maturze."
    >
      <div className={styles.todayHead}>
        <Kicker icon={Sparkles}>Dziś warto</Kicker>
        {showSubject && (
          <Link to={`/przedmiot/${subject.id}`} className={styles.tag}>
            <SubjectIcon subject={subject} size="sm" />
            {subject.name}
          </Link>
        )}
      </div>
      <h2 id="today-title" className="h1">
        {rec.skill}
      </h2>
      <p className={styles.reason}>{rec.reason}</p>
      <div className={styles.actions}>
        <button type="button" className="btn btn-primary" data-tutor="today-cta">
          <FormatIcon size={18} aria-hidden="true" />
          {rec.format} · {rec.minutes} min
        </button>
        <button type="button" className="btn btn-ghost" aria-expanded={showAlternatives} onClick={() => setShowAlternatives((v) => !v)}>
          Inna propozycja
        </button>
      </div>
      {showAlternatives && (
        <ul className={styles.alternatives}>
          {subject.alternatives.map((a) => {
            const Icon = formatIcons[a.format];
            return (
              <li key={a.skill}>
                <button type="button">
                  <Icon size={18} aria-hidden="true" className={styles.altIcon} />
                  <span className={styles.altName}>{a.skill}</span>
                  <span className="muted small">
                    {a.format} · {a.minutes} min
                  </span>
                </button>
              </li>
            );
          })}
          <li>
            <button type="button" onClick={openTutor}>
              <formatIcons.Tutor size={18} aria-hidden="true" className={styles.altIcon} />
              <span className={styles.altName}>Porozmawiaj o tym z Pestką</span>
              <span className="muted small">pytania zamiast wykładu</span>
            </button>
          </li>
        </ul>
      )}
    </article>
  );
}

export function Dashboard() {
  const { id } = useParams();
  const subject = getSubject(id);
  const { showHints, startTour } = useTutor();
  const pick = subject ?? topPick();

  // Przy pierwszym wejściu Pestka prowadzi przewodnik, potem zwykłe wskazówki dla danego pulpitu.
  useEffect(() => {
    const hints: Hint[] = [
      {
        target: "today-cta",
        text: `Na dziś polecam: ${pick.recommendation.skill.toLowerCase()}${subject ? "" : ` (${pick.name.toLowerCase()})`}. ${pick.recommendation.minutes} minut w twoim najsłabszym miejscu.`,
      },
    ];
    if (subject) {
      const weakest = [...subject.skills].sort((a, b) => a.mastery - b.mastery)[0];
      hints.push({ target: "skills-weak", text: `Najbardziej uważaj na „${weakest.name}”: ${weakest.note}.` });
    }
    const t = window.setTimeout(() => (isTourDone() ? showHints(`dash-${id ?? "all"}`, hints) : startTour()), 900);
    return () => window.clearTimeout(t);
  }, [id]);

  if (id && !subject) return <Navigate to="/" replace />;

  const scope = subject ? [subject] : subjects;
  const exam = subject ?? nearestExam();
  const days = daysUntil(exam.examDate);
  const reviewCount = scope.reduce((n, s) => n + s.reviews.count, 0);
  const reviewMinutes = scope.reduce((n, s) => n + s.reviews.minutes, 0);
  const cont = scope.find((s) => s.continueItem);
  const sheetSubject = scope.find((s) => s.lastSheet);

  return (
    <main className={`container ${styles.page}`}>
      <SubjectBar active={subject?.id} />

      <section className={styles.hero}>
        <h1 className="display">
          {subject ? (
            <>
              <span className={styles.line} data-tutor="hero">
                {subject.name}
              </span>
              <span className={`accent ${styles.line}`}>Do matury {days} dni.</span>
            </>
          ) : (
            <>
              <span className={styles.line} data-tutor="hero">
                Cześć, {student.name}.
              </span>
              <span className={`accent ${styles.line}`}>Do pierwszej matury {days} dni.</span>
            </>
          )}
        </h1>
        <p className="muted">
          {subject ? `Poziom ${subject.level} · egzamin ${formatDate(subject.examDate)}` : `${exam.name} · ${formatDate(exam.examDate)}`}
        </p>
      </section>

      <section className={styles.top}>
        <Today subject={pick} showSubject={!subject} />

        <div className={styles.side}>
          <div
            className={styles.block}
            data-tutor="reviews"
            data-tutor-about="Powtórki wracają, gdy opanowanie umiejętności zaczyna spadać. Kilka minut dziennie wystarczy, żeby nie uciekło."
          >
            <Kicker icon={RotateCcw}>Powtórki</Kicker>
            <p className="h2">{reviewCount} umiejętności wracają dziś</p>
            <p className="muted">
              ok. {reviewMinutes} min
              {!subject && ` · ${subjects.map((s) => `${s.reviews.count} ${s.name.toLowerCase()}`).join(", ")}`}
            </p>
            <Link to="/powtorki" className="btn btn-secondary btn-sm">
              <RotateCcw size={16} aria-hidden="true" />
              Zacznij powtórki
            </Link>
          </div>
          {cont?.continueItem && (
            <div className={styles.block}>
              <Kicker icon={CirclePlay}>Kontynuuj</Kicker>
              <p className="h3">
                {cont.continueItem.title} <span className="muted">· {cont.continueItem.step}</span>
              </p>
              {!subject && <p className="muted small">{cont.name}</p>}
              <div className={styles.progress} role="progressbar" aria-label="Postęp" aria-valuenow={cont.continueItem.progress} aria-valuemin={0} aria-valuemax={100}>
                <span style={{ width: `${cont.continueItem.progress}%` }} />
              </div>
              <Link to="/nauka" className="link">
                Wróć do pracy <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {subject ? (
        <section
          className={styles.section}
          aria-labelledby="skills-title"
          data-tutor-about="Mapa pokazuje opanowanie każdej umiejętności. Pomarańczowy pasek to luka, zielony to pewny grunt."
        >
          <div className={styles.sectionHead}>
            <h2 id="skills-title" className="h2">
              Mapa umiejętności
            </h2>
            <Link to="/umiejetnosci" className="link">
              Pełna mapa <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <ul className={styles.rows}>
            {[...subject.skills]
              .sort((a, b) => a.mastery - b.mastery)
              .map((s, i) => (
                <li key={s.name} className={styles.skill} data-tutor={i === 0 ? "skills-weak" : undefined}>
                  <span className={styles.skillName}>{s.name}</span>
                  <Mastery value={s.mastery} />
                  <span className={styles.pct}>{s.mastery}%</span>
                  <span className={styles.note}>{s.note}</span>
                </li>
              ))}
          </ul>
        </section>
      ) : (
        <section className={styles.section} aria-labelledby="subjects-title">
          <div className={styles.sectionHead}>
            <h2 id="subjects-title" className="h2">
              Twoje przedmioty
            </h2>
          </div>
          <ul className={styles.rows}>
            {subjects.map((s) => {
              const weakest = [...s.skills].sort((a, b) => a.mastery - b.mastery)[0];
              const avg = averageMastery(s);
              return (
                <li key={s.id}>
                  <Link to={`/przedmiot/${s.id}`} className={styles.subjectRow}>
                    <SubjectIcon subject={s} size="lg" />
                    <span className={styles.subjectName}>
                      <span className="h3">{s.name}</span>
                      <span className="muted small">
                        {s.level} · matura za {daysUntil(s.examDate)} dni
                      </span>
                    </span>
                    <span className={styles.subjectMastery}>
                      <Mastery value={avg} />
                      <span className={styles.pct}>{avg}%</span>
                    </span>
                    <span className={styles.note}>najsłabiej: {weakest.name.toLowerCase()}</span>
                    <ChevronRight size={20} className={styles.chevron} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className={styles.columns}>
        <div className={styles.column}>
          <Kicker icon={Search}>Wybierz temat</Kicker>
          <p className="muted">Ucz się czegoś spoza rekomendacji.</p>
          <label className={styles.search}>
            <span className="visually-hidden">Szukaj umiejętności</span>
            <Search size={18} aria-hidden="true" />
            <input className="input" placeholder="Szukaj umiejętności…" />
          </label>
        </div>
        {sheetSubject?.lastSheet && (
          <div className={styles.column} data-tutor-about="Wynik ostatniego arkusza egzaminacyjnego. W trybie egzaminu nie pomagam, żeby wynik był uczciwy.">
            <Kicker icon={FileText}>Ostatni arkusz</Kicker>
            <p className={styles.stat}>
              {sheetSubject.lastSheet.score}
              <span>/{sheetSubject.lastSheet.max}</span>
            </p>
            <p className="muted small">
              {subject ? "" : `${sheetSubject.name}, `}
              {sheetSubject.lastSheet.title}
            </p>
            <Link to="/arkusze" className="link">
              Arkusze i egzamin <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        )}
        <div className={styles.column} data-tutor-about="Mapa wiedzy to twój notatnik połączeń między pojęciami. Dopisuję do niej powiązania, które zauważę.">
          <Kicker icon={Network}>Mapa wiedzy</Kicker>
          <p className={styles.stat}>{knowledgeMap.nodes}</p>
          <p className="muted small">węzłów, {knowledgeMap.newLinks} nowe połączenia od wczoraj</p>
          <Link to="/nauka" className="link">
            Otwórz notatnik <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
