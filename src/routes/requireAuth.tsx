import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/user";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const user = useUser();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
