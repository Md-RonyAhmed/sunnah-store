import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/Shared/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) return <Loading />;
  if (!user) {
    return (
      <Navigate to="/sunnah-store/signin" state={{ from: location }} replace />
    );
  }
  return children;
};

export default PrivateRoutes;
