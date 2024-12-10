import { Outlet } from "react-router-dom";
import Header from "../components/Shared/Header/Header";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
