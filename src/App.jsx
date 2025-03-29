import React, { useState, useEffect, useRef } from 'react';
import Controller from './components/Controller';
import Timer from './components/Timer';

export default function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [currentInterval, setCurrentInterval] = useState('session');
  const [timerIsOn, setTimerIsOn] = useState(false);
  const [time, setTime] = useState(25 * 60);

  const intervalRef = useRef(null);
  const beepRef = useRef(null);

  useEffect(() => {
    beepRef.current = document.getElementById('beep');

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  };

  const handleLengthChange = (intervalType, changeType) => {
    if (!timerIsOn) {
      if (intervalType === currentInterval) {
        if (changeType === 'increment' && eval(`${intervalType}Length`) < 60) {
          if (intervalType === 'session') {
            setSessionLength((prev) => prev + 1);
            setTime((sessionLength + 1) * 60);
          } else {
            setBreakLength((prev) => prev + 1);
            setTime((breakLength + 1) * 60);
          }
        } else if (
          changeType === 'decrement' &&
          eval(`${intervalType}Length`) > 1
        ) {
          if (intervalType === 'session') {
            setSessionLength((prev) => prev - 1);
            setTime((sessionLength - 1) * 60);
          } else {
            setBreakLength((prev) => prev - 1);
            setTime((breakLength - 1) * 60);
          }
        }
      } else {
        if (changeType === 'increment' && eval(`${intervalType}Length`) < 60) {
          intervalType === 'session'
            ? setSessionLength((prev) => prev + 1)
            : setBreakLength((prev) => prev + 1);
        } else if (
          changeType === 'decrement' &&
          eval(`${intervalType}Length`) > 1
        ) {
          intervalType === 'session'
            ? setSessionLength((prev) => prev - 1)
            : setBreakLength((prev) => prev - 1);
        }
      }
    }
  };

  const handlePlayPause = () => {
    if (timerIsOn) {
      clearInterval(intervalRef.current);
      setTimerIsOn(false);
    } else {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            const nextInterval =
              currentInterval === 'session' ? 'break' : 'session';
            const nextTime =
              (currentInterval === 'session' ? breakLength : sessionLength) *
              60;

            setCurrentInterval(nextInterval);
            beepRef.current.play();

            return nextTime;
          }

          return prevTime - 1;
        });
      }, 1000);

      setTimerIsOn(true);
    }
  };

  const handleReset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setCurrentInterval('session');
    setTimerIsOn(false);
    setTime(25 * 60);

    clearInterval(intervalRef.current);

    if (beepRef.current) {
      beepRef.current.pause();
      beepRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <h1>Pomodoro Clock</h1>

      <Timer currentInterval={currentInterval} time={formatTime(time)} />

      <div id="buttons">
        <button id="start_stop" onClick={handlePlayPause}>
          {timerIsOn ? 'Stop' : 'Play'}
        </button>

        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div id="controllers">
        <Controller
          title="Session Length"
          time={sessionLength}
          handleLengthChange={handleLengthChange}
          intervalType="session"
        />

        <Controller
          title="Break Length"
          time={breakLength}
          handleLengthChange={handleLengthChange}
          intervalType="break"
        />
      </div>
    </>
  );
}
