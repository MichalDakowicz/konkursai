import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { subjects } from "../data/demo";
import { logout } from "../auth";
import { TutorAvatar } from "./TutorAvatar";
import { useTutor } from "./TutorContext";
import styles from "./TopNav.module.css";

const links = [
  { to: "/", label: "Pulpit", end: true },
  { to: "/nauka", label: "Nauka" },
  { to: "/arkusze", label: "Arkusze" },
  { to: "/umiejetnosci", label: "Mapa umiejętności" },
  { to: "/powtorki", label: "Powtórki" },
];

type Props = {
  subject: string;
  onSubjectChange: (s: string) => void;
};

export function TopNav({ subject, onSubjectChange }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const tutor = useTutor();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  function signOut() {
    logout();
    navigate("/logowanie");
  }

  return (
    <div className={styles.wrap}>
      <nav className={styles.nav} aria-label="Główna">
        <Link to="/" className={styles.logo}>
          [nazwa]
        </Link>

        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.right}>
          <label className={styles.subject}>
            <span className="visually-hidden">Przedmiot</span>
            <select value={subject} onChange={(e) => onSubjectChange(e.target.value)}>
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </label>
          {location.pathname === "/tutor" ? (
            <span className={`${styles.tutor} ${styles.tutorActive}`}>
              <TutorAvatar size={36} state={tutor.state} />
              <span className={styles.tutorText}>Tutor</span>
            </span>
          ) : (
            <button type="button" className={styles.tutor} onClick={tutor.open} aria-label="Otwórz rozmowę z tutorem">
              <TutorAvatar size={36} state={tutor.state} />
              <span className={styles.tutorText}>Tutor</span>
            </button>
          )}
          <Link to="/profil" className={styles.profile} aria-label="Profil">
            O
          </Link>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="visually-hidden">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className={styles.mobileMenu}>
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={({ isActive }) => (isActive ? styles.mobileActive : "")}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <label className={styles.mobileSubject}>
            <span className="label">Przedmiot</span>
            <select className="input" value={subject} onChange={(e) => onSubjectChange(e.target.value)}>
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <button type="button" className="btn btn-ghost" onClick={signOut}>
            Wyloguj
          </button>
        </div>
      )}
    </div>
  );
}
