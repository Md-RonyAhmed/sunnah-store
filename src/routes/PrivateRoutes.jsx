import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/Shared/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <Loading />;
  if (!user) {
    return <Navigate to="/sunnah-store/signin" />;
  }
  return children;
};

export default PrivateRoutes;
