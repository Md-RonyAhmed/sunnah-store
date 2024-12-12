import { FaBook, FaGlobe, FaUtensils } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="flex flex-col items-center mt-10 justify-center py-20 ">
      <div className="">
        <h2 className="text-center text-3xl mb-4 font-bold">About Us</h2>
        <p className=" text-justify mb-6">
          Sunnah Store is your trusted online destination for Premium
          Electronics, Authentic Halal Food, and an Extensive collection of
          Books. Operating under the renowned {""}
          <Link
            className="text-blue-700 font-semibold"
            to={"https://assunnahfoundation.org/"}
          >
            As Sunnah Foundation
          </Link>
          , our mission is to seamlessly blend tradition with modernity by
          offering high-quality, ethically sourced products that meet your
          everyday needs while aligning with timeless values.
        </p>
        <h3 className="text-2xl font-semibold mb-4">
          Our Legacy: As Sunnah Foundation
        </h3>
        {/* <p className=" text-justify mb-6">
          At the heart of Sunnah Store lies the vision of{" "}
          <Link
            className="text-blue-700 font-semibold"
            to={"https://assunnahfoundation.org/"}
          >
            As Sunnah Foundation
          </Link>
          , a non-profit organization dedicated to enriching lives through
          education, community empowerment, and sustainable initiatives. By
          shopping with us, you support a greater mission of promoting ethical
          living and fostering positive change in society.
        </p> */}
        <p>
          The As-Sunnah Foundation is a non-political, non-profitable
          government-registered organization dedicated to education, da'wah and
          full human welfare. It was established in 2017 by Shaikh Ahmadullah.
          He is the chairman of the organization and manages it directly.
          As-Sunnah Foundation was registered in 2019 from Joint Stock, Whose
          registration number is S-13111/2019. Since then, it has been working
          rigorously to serve the humanity, reform the society, developing the
          utmost morality, arrange various activities to build up a neat and
          clean mentality and ultimately to build up an ideal society following
          in the footsteps of the Prophet Muhammad, the teacher of humanity, the
          messenger of human liberation and peace and the ideal of human
          welfare. One of the goals of As-Sunnah Foundation is to build life and
          society based on the Quran and Sunnah and to propagate and spread
          authentic knowledge. It is our policy to adopt a moderate approach
          based on the Qur'an and Sunnah following the path of the righteous
          predecessors.
        </p>{" "}
        <h4 className="text-gray-800 font-semibold mt-5 mb-4">What We Offer</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col items-center text-center">
            <FaGlobe className="text-4xl text-blue-500 mb-2" />
            <h4 className="text-gray-800 font-medium">Electronics</h4>
            <p className="text-gray-600">
              Reliable, cutting-edge products to enhance your lifestyle.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaUtensils className="text-4xl text-green-500 mb-2" />
            <h4 className="text-gray-800 font-medium">Halal Food</h4>
            <p className="text-gray-600">
              Authentic, halal-certified food products of the highest quality.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaBook className="text-4xl text-orange-500" />
            <h4 className="text-gray-800 font-medium">Books</h4>
            <h4 className="text-gray-600">
              A rich collection of books to nurture knowledge and growth.
            </h4>
          </div>
          <div className="flex flex-col items-center text-center">
            <GrDeliver className="text-4xl text-orange-500 " />
            <h4 className="text-gray-800 font-medium">Cash On Delivery</h4>
            <h4 className="text-gray-600">
              A rich collection of books to nurture knowledge and growth.
            </h4>
          </div>
        </div>
        <h4 className="text-gray-700 text-justify">
          At Sunnah Store, we are committed to providing not just products but
          meaningful solutions that enrich your life and align with your values.
          Join us in celebrating a lifestyle inspired by Sunnah, where timeless
          principles meet the demands of modern living.
        </h4>
      </div>
    </div>
  );
};

export default About;
