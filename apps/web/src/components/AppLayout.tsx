import { useState } from "react";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { TopNav } from "./TopNav";
import { TutorDock } from "./TutorDock";
import { TutorProvider } from "./TutorContext";
import { isLoggedIn } from "../auth";
import { student } from "../data/demo";

type LayoutContext = { subject: string };

export function AppLayout() {
  const [subject, setSubject] = useState(student.subject);
  const location = useLocation();

  if (!isLoggedIn()) return <Navigate to="/logowanie" replace />;

  return (
    <TutorProvider>
      <TopNav subject={subject} onSubjectChange={setSubject} />
      <Outlet context={{ subject } satisfies LayoutContext} />
      {location.pathname !== "/tutor" && <TutorDock />}
    </TutorProvider>
  );
}

export function useLayout(): LayoutContext {
  return useOutletContext<LayoutContext>();
}
