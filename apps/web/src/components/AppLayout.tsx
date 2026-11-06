import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { TopNav } from "./TopNav";
import { TutorDock } from "./TutorDock";
import { TutorGuide } from "./TutorGuide";
import { TutorProvider } from "./TutorContext";
import { isLoggedIn } from "../auth";

export function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!isLoggedIn()) return <Navigate to="/logowanie" replace />;

  return (
    <TutorProvider>
      <TopNav />
      <Outlet />
      {location.pathname !== "/tutor" && (
        <>
          <TutorGuide />
          <TutorDock />
        </>
      )}
    </TutorProvider>
  );
}
