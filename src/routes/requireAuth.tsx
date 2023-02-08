import { Navigate, useLocation } from "react-router-dom";
import { useUserQuery } from "../hooks";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const userQuery = useUserQuery();
  const location = useLocation();
  const user = userQuery.data;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
