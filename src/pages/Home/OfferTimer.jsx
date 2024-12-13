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

  // Format the time parts with leading zeros
  const days = String(timeLeft.days).padStart(2, "0");
  const hours = String(timeLeft.hours).padStart(2, "0");
  const minutes = String(timeLeft.minutes).padStart(2, "0");
  const seconds = String(timeLeft.seconds).padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 shadow-lg rounded-lg text-center mb-10">
      <h2 className="text-4xl font-extrabold mb-6 tracking-wide">
        Upcoming Offer
      </h2>
      <div className="flex justify-center space-x-4 text-lg">
        {[
          { label: "Days", value: days },
          { label: "Hours", value: hours },
          { label: "Minutes", value: minutes },
          { label: "Seconds", value: seconds },
        ].map((time, index) => (
          <div key={time.label} className="flex flex-col items-center">
            <span className="block text-5xl font-bold bg-white text-green-500 rounded-md px-4 py-2 shadow-md">
              {time.value}
            </span>
            <span className="mt-2 text-sm uppercase tracking-wide font-medium">
              {time.label}
            </span>
            {index < 3 && (
              <span className="text-4xl text-white font-bold mx-2">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferTimer;
