import { useEffect, useState } from "react";
import Ebook from "../../components/Ebook";
import Banner from "../../components/Shared/Header/Banner/Banner";
import AdvertisementModal from "../../components/AdvertisementModal";
import OfferTimer from "./OfferTimer";
import Categories from "./categories/Categories";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const targetDate = "2024-12-15T00:00:00";

  useEffect(() => {
    // Check the localStorage value and update the state
    const checkModalState = () => {
      const isModalShown = localStorage.getItem("modal");
      if (isModalShown === "false" || !isModalShown) {
        setShowModal(true);
        localStorage.setItem("modal", "true");
      }
    };

    // Initial check on component mount
    checkModalState();
    // Set a timer to reset the localStorage value to "false" after 24 hours
    const resetTimer = setTimeout(() => {
      localStorage.setItem("modal", "false");
      checkModalState();
    }, 1000000);

    // Cleanup the timer
    return () => clearTimeout(resetTimer);
  }, [showModal]);

  return (
    <>
      <Banner />
      <OfferTimer targetDate={targetDate} />
      <Categories />
      <Ebook />
      <AdvertisementModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Home;
