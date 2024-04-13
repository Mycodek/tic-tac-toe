import React, { useState, useEffect } from 'react';

function Timer({ isActive }) {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          const [hours, minutes, seconds] = prevTime.split(":").map(Number);
          const totalTime = hours * 3600 + minutes * 60 + seconds + 1;
          const newHours = Math.floor(totalTime / 3600).toString().padStart(2, '0');
          const newMinutes = Math.floor((totalTime % 3600) / 60).toString().padStart(2, '0');
          const newSeconds = (totalTime % 60).toString().padStart(2, '0');
          return `${newHours}:${newMinutes}:${newSeconds}`;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  return (
    <div className="clock">
      {time}
    </div>
  );
}

export default Timer;
