import { useState, useEffect } from "react";

import "./App.css";

const TOTAL_SESSIONS = 2;
const STUDY_TIME = 4;
const BREAK_TIME = 2;
const LONGER_BREAK_TIME = 5;
function App() {
  const [remainingSessions, setRemainingSessions] = useState(TOTAL_SESSIONS);
  const [studyTime, setStudyTime] = useState(3);
  const [breakTime, setBreakTime] = useState(0);

  const [breakTimeStart, setBreakTimeStart] = useState(false);
  const [studyTimerStart, setStudyTimerStart] = useState(false);

  useEffect(() => {
    let studyTimer: number;

    if (!breakTimeStart && !studyTimerStart && remainingSessions) {
      setStudyTimerStart(true);
      setStudyTime(STUDY_TIME);
      setBreakTime(BREAK_TIME);
    }

    if (studyTimerStart) {
      studyTimer = setInterval(() => {
        setStudyTime((prev) => prev - 1);
      }, 1000);

      if (!studyTime) {
        clearInterval(studyTimer);
        setBreakTimeStart(true);
        setBreakTime(remainingSessions ? BREAK_TIME : LONGER_BREAK_TIME);
      }
    }

    return () => clearInterval(studyTimer);
  }, [studyTime, remainingSessions, breakTimeStart, studyTimerStart]);

  // ------------------------------------------------------------

  useEffect(() => {
    let breakTimer: number;

    if (breakTimeStart) {
      breakTimer = setInterval(() => {
        setBreakTime((prev) => prev && prev - 1);
      }, 1000);

      if (!breakTime && !studyTime && remainingSessions) {
        setRemainingSessions((prev) => prev && prev - 1);
        setStudyTime(STUDY_TIME);
        clearInterval(breakTimer);
        setBreakTimeStart(false);
      }
    }
    return () => clearInterval(breakTimer);
  }, [breakTime, breakTimeStart, remainingSessions]);

  return (
    <>
      <br />
      <div>{remainingSessions} Remaining Sessions</div>
      <br />
      <div>{studyTime} Study Timer</div>
      <br />
      <div>{breakTime} Break timer</div>
      <br />
    </>
  );
}

export default App;
