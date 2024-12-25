import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/Shared/Loading";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation()

  if (loading || isAdminLoading) {
    return <Loading />;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/books" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
