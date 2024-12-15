import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import Loading from "../components/Shared/Loading";

const AuthLayout = () => {
  const navigation = useNavigation();
  return (
    <div>
      <Header />
      <div className="min-h-screen container">
        {navigation.state === "loading" ? <Loading /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
