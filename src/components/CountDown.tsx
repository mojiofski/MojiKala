"use client";

import Countdown from "react-countdown";
const CountDown = () => {
  const endingDate = new Date("2025/02/15");
  return (
    <div>
      <Countdown
        className="font-semibold text-red-600 text-3xl"
        date={endingDate}
      />
    </div>
  );
};

export default CountDown;
