import { Link } from "react-router-dom";

type Props = { title: string; sub: string };

export function Placeholder({ title, sub }: Props) {
  return (
    <main className="container" style={{ paddingTop: 32, paddingBottom: 120, display: "grid", gap: 24, justifyItems: "start" }}>
      <span className="label">Wkrótce</span>
      <h1 className="display">{title}</h1>
      <p className="lead" style={{ maxWidth: 560 }}>
        {sub}
      </p>
      <Link to="/" className="btn btn-primary">
        Wróć na pulpit
      </Link>
    </main>
  );
}
