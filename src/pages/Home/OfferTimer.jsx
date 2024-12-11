import { useEffect, useState } from "react";
import moment from "moment";

const OfferTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  // Function to calculate remaining time
  function calculateTimeLeft(targetDate) {
    const now = moment();
    const target = moment(targetDate);
    const duration = moment.duration(target.diff(now));

    if (duration.asMilliseconds() <= 0) return null;

    return {
      days: Math.floor(duration.asDays()),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  }

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft(targetDate);
      setTimeLeft(updatedTime);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <div className="text-red-500">The offer has started!</div>;
  }

  return (
    <div className="bg-green-400 text-white p-4 rounded-lg shadow-md text-center my-10">
      <h2 className="text-2xl font-bold mb-2">Upcoming Offer</h2>
      <div className="flex justify-center space-x-4 text-lg">
        <div>
          <span className="block text-4xl font-bold">{timeLeft.days}</span>
          <span>Days</span>
        </div>
        <div>
          <span className="block text-4xl font-bold">{timeLeft.hours}</span>
          <span>Hours</span>
        </div>
        <div>
          <span className="block text-4xl font-bold">{timeLeft.minutes}</span>
          <span>Minutes</span>
        </div>
        <div>
          <span className="block text-4xl font-bold">{timeLeft.seconds}</span>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default OfferTimer;
