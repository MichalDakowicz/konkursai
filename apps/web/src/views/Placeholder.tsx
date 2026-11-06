import { Link, useNavigate } from "react-router-dom";
import { logout } from "../auth";

type Props = { title: string; sub: string; showLogout?: boolean };

export function Placeholder({ title, sub, showLogout }: Props) {
  const navigate = useNavigate();

  return (
    <main className="container" style={{ paddingTop: 96, paddingBottom: 160, display: "grid", gap: 24, justifyItems: "start" }}>
      <span className="label">Wkrótce</span>
      <h1 className="display">{title}</h1>
      <p className="lead" style={{ maxWidth: 560 }}>
        {sub}
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link to="/" className="btn btn-primary">
          Wróć na pulpit
        </Link>
        {showLogout && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              logout();
              navigate("/logowanie");
            }}
          >
            Wyloguj
          </button>
        )}
      </div>
    </main>
  );
}
