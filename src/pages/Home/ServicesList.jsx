import { MdOutlineRocketLaunch } from "react-icons/md";
import { FaHandsHoldingCircle } from "react-icons/fa6";
import { GiGearHammer } from "react-icons/gi";
import { BsGift } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";

const ServicesList = () => {
  return (
    <section className="flex flex-wrap items-center justify-between gap-2 p-2 my-10 border-2 rounded-md ">
      <div className="flex items-center justify-start gap-5">
        <div className="flex items-center justify-center w-16 h-16 text-5xl text-white bg-red-500 rounded-md ">
          <MdOutlineRocketLaunch />
        </div>
        <div>
          <h4 className="text-gray-900 uppercase">Free Shipping!</h4>
          <p className="text-gray-600">On Orders Over 10,000 Taka.</p>
        </div>
      </div>

      <div className="flex items-center justify-start gap-5">
        <div className="flex items-center justify-center w-16 h-16 text-5xl text-white bg-green-500 rounded-md ">
          <FaHandsHoldingCircle />
        </div>
        <div>
          <h4 className="text-gray-900 uppercase">Exchange Policy</h4>
          <p className="text-gray-600">Fast & Hassle Free</p>
        </div>
      </div>

      <div className="flex items-center justify-start gap-5">
        <div className="flex items-center justify-center w-16 h-16 text-5xl text-white bg-purple-500 rounded-md ">
          <GiGearHammer />
        </div>
        <div>
          <h4 className="text-gray-900 uppercase">Online Support</h4>
          <p className="text-gray-600">24/7 Everyday</p>
        </div>
      </div>

      <div className="flex items-center justify-start gap-5">
        <div className="flex items-center justify-center w-16 h-16 text-5xl text-white bg-orange-500 rounded-md ">
          <BsGift />
        </div>
        <div>
          <h4 className="text-gray-900 uppercase">Reward Points</h4>
          <p className="text-gray-600">Earn 1% Cashback</p>
        </div>
      </div>

      <div className="flex items-center justify-start gap-5">
        <div className="flex items-center justify-center w-16 h-16 text-5xl text-white bg-blue-500 rounded-md ">
          <GiWallet />
        </div>
        <div>
          <h4 className="text-gray-900 uppercase">Payment Method</h4>
          <p className="text-gray-600">Credit Card, bKash & PayPal</p>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
