import { useState, useEffect } from "react";

// this event time should be replace with dynamic date
const eventDate = new Date("2023-10-12T23:59:59").getTime();

const calculateTimeRemaining = () => {
  const currentDate = new Date().getTime();
  const timeRemaining = eventDate - currentDate;

  if (timeRemaining <= 0) {
    return null;
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const EventCountDown = () => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearTimeout(timer);
  });
  return (
    <div>
      {timeRemaining ? (
        <p className="text-[25px] text-[#3f52cf] animate-pulse">
          {`${timeRemaining.days} days ${timeRemaining.hours}h ${timeRemaining.minutes}min ${timeRemaining.seconds}sec left`}
        </p>
      ) : (
        <span className="text-[red] text-[25px]">Event close 🥲</span>
      )}
    </div>
  );
};

export default EventCountDown;
