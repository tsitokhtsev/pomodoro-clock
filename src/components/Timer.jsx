import React from 'react';

export default function Timer({ currentInterval, time }) {
  return (
    <div>
      <h2 id="timer-label">{currentInterval}</h2>
      <h1 id="time-left">{time}</h1>
    </div>
  );
}
