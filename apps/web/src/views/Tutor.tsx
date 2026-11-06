import { TutorAvatar } from "../components/TutorAvatar";
import { TutorChat } from "../components/TutorChat";
import { useTutor } from "../components/TutorContext";
import { useLayout } from "../components/AppLayout";
import { recommendation, skills } from "../data/demo";
import styles from "./Tutor.module.css";

export function Tutor() {
  const { state } = useTutor();
  const { subject } = useLayout();
  const focus = skills.find((s) => s.name === recommendation.skill);

  return (
    <main className={`container ${styles.page}`}>
      <section className={styles.intro}>
        <TutorAvatar size={96} state={state} className={styles.avatar} />
        <h1 className="h1">Tutor</h1>
        <p className="muted">
          Prowadzi cię pytaniami do zrozumienia. Zna twoją mapę umiejętności i nie pyta o to, co już umiesz. Rozmowa kończy się
          krótkim testem na nowym przykładzie.
        </p>
        <dl className={styles.context}>
          <div>
            <dt>Przedmiot</dt>
            <dd>{subject}</dd>
          </div>
          <div>
            <dt>Temat</dt>
            <dd>{recommendation.skill}</dd>
          </div>
          {focus && (
            <div>
              <dt>Opanowanie</dt>
              <dd>{focus.mastery}%</dd>
            </div>
          )}
          {focus && (
            <div>
              <dt>Typowy błąd</dt>
              <dd>{focus.note}</dd>
            </div>
          )}
        </dl>
      </section>

      <section className={styles.chat} aria-label="Rozmowa z tutorem">
        <TutorChat />
      </section>
    </main>
  );
}
