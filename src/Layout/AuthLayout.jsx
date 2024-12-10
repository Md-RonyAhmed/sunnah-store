import { Outlet } from "react-router-dom";
import Header from "../components/Shared/Header/Header";

const AuthLayout = () => {
  return (
    <div className="container" >
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
