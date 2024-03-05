import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../auth/firebase";

const ProtectedRoute = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log("user: ", user);
  //console.log("children: ", children);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
