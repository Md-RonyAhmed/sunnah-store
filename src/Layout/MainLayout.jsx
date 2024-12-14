import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import Loading from "../components/Shared/Loading";

const MainLayout = () => {
  const navigation = useNavigation();
  return (
    <div>
      <Header />
      <div className="min-h-full container">
        {navigation.state === "loading" ? <Loading /> : <Outlet />}
      </div>
      <div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
