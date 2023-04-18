import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect user to previous location after reload
  useEffect(() => {
    const pageAccessedByReload =
      (window.performance.navigation &&
        window.performance.navigation.type === 1) ||
      window.performance
        .getEntriesByType("navigation")
        // @ts-ignore
        .map((nav) => nav.type)
        .includes("reload");

    if (pageAccessedByReload) {
      const lastLocation = localStorage.getItem("last_location");
      navigate(lastLocation || "/home/all", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== "/login") {
      localStorage.setItem("last_location", location.pathname);
    }
  });

  return (
    <main className="App">
      <Outlet />
    </main>
  );
}

export default Root;
