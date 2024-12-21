import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import DelwarHossainSayeedi from "../../assets/images/popular_authors/deloyar_hosain.jpg";
import KariAbdulBased from "../../assets/images/popular_authors/kari_abdul_based.jpg";
import shayekhAhmadullah from "../../assets/images/popular_authors/shayekh_ahmadullah.jpg";
import ZakirNaik from "../../assets/images/popular_authors/zakir_nayek.jpg";
import mizanurRahmanAzhari from "../../assets/images/popular_authors/mizanur_rahmar_azhari.jpg";
import rony from "../../assets/images/popular_authors/rony.jpeg";
import MuhammadIsmail from "../../assets/images/popular_authors/mominuli_slam.jpeg";
import khabbab from "../../assets/images/popular_authors/khabbab_hossen.jpg";

const PopularAuthors = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="px-2 mb-8 bg-white rounded-lg shadow-xl">
        <h2 className="py-5 text-2xl">Popular Authors</h2>
        <Slider {...settings}>
          <div className="my-3 space-y-3 text-center">
            <img
              className="w-32 h-32 mx-auto rounded-full ring-4 ring-white hover:ring-primary"
              src={KariAbdulBased}
              alt="kari-abdul-basit"
            />
            <p className="">ক্বারী আব্দুল বাসিত</p>
          </div>
          <div className="my-3 space-y-3 text-center">
            <img
              className="w-32 h-32 mx-auto rounded-full ring-4 ring-white hover:ring-primary"
              src={ZakirNaik}
              alt="D.Zakir-nayek"
            />
            <p className="">ড. জাকির নায়েক</p>
          </div>
          <div className="my-3 space-y-3 text-center">
            <img
              className="w-32 h-32 mx-auto rounded-full ring-4 ring-white hover:ring-primary"
              src={DelwarHossainSayeedi}
              alt="deloyar_hosain"
            />
            <p className="">দেলোয়ার হোসেন সাঈদী</p>
          </div>
          <div className="my-3 space-y-3 text-center">
            <img
              className="w-32 h-32 mx-auto rounded-full ring-4 ring-white hover:ring-primary"
              src={shayekhAhmadullah}
              alt="shayekh-ahmadullah"
            />
            <p className="">শায়খ আহমাদুল্লাহ</p>
          </div>
          <div className="my-3 space-y-3 text-center">
            <img
              className="w-32 h-32 mx-auto rounded-full ring-4 ring-white hover:ring-primary"
              src={mizanurRahmanAzhari}
              alt="mizanurRahmanAzhari"
            />
            <p className="">মিজানুর রহমান আজহারী</p>
          </div>
          <div className="my-3 space-y-3 text-center">
            <img
              className="w-32 h-32 mx-auto rounded-full ring-4 ring-white hover:ring-primary"
              src={rony}
              alt="rony"
            />
            <p className="">মোহাম্মাদ রনি</p>
          </div>
          <div className="my-3 space-y-3 text-center">
            <img
              className="w-32 h-32 mx-auto rounded-full ring-4 ring-white hover:ring-primary"
              src={MuhammadIsmail}
              alt="MuhammadIsmail"
            />
            <p className="">মোহাম্মাদ ঈসমাইল</p>
          </div>
          <div className="my-3 space-y-3 text-center">
            <img
              className="w-32 h-32 mx-auto rounded-full ring-4 ring-white hover:ring-primary"
              src={khabbab}
              alt="khabbab"
            />
            <p className="">মোঃ খাব্বাব হোসেন</p>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default PopularAuthors;
