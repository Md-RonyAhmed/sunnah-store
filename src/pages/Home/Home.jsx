import { useEffect, useState } from "react";
import Ebook from "../../components/Ebook";
import Banner from "../../components/Shared/Header/Banner/Banner";
import AdvertisementModal from "../../components/AdvertisementModal";
import OfferTimer from "./OfferTimer/OfferTimer";
import Categories from "./categories/Categories";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const targetDate = "2024-12-15T00:00:00";

  useEffect(() => {
    // Check the sessionStorage value and update the state
    const checkModalState = () => {
      const isModalShown = sessionStorage.getItem("modal");
      if (isModalShown === "false" || !isModalShown) {
        setShowModal(true);
        sessionStorage.setItem("modal", "true");
      }
    };

    // Initial check on component mount
    const initialModalLoad = setTimeout(() => {
      checkModalState();
    }, 2000);

    // Set a timer to reset the sessionStorage value to "false" after 30 mins
    const resetTimer = setTimeout(() => {
      sessionStorage.setItem("modal", "false");
      checkModalState();
    }, 1800000);

    // Cleanup the timer
    return () => {
      clearTimeout(initialModalLoad);
      clearTimeout(resetTimer);
    };
  }, [showModal, setShowModal]);

  return (
    <>
      <Helmet>
        <title>Sunnah Store | Home</title>
      </Helmet>
      <Banner />
      <OfferTimer targetDate={targetDate} />
      <Categories />
      <AdvertisementModal showModal={showModal} setShowModal={setShowModal} />
      <Ebook />
    </>
  );
};

export default Home;
