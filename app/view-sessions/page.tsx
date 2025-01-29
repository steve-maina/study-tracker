"use client";
import ExportDataForm from "@/components/ExportData";
import { Button } from "@mui/material";
import moment, { duration } from "moment";
import { getGroupedSessions, getSessions } from "../actions/actions";
import { useEffect, useRef, useState } from "react";
import { convertToTimeUnit, timeUnit } from "../lib/assorted-c";

function getTimeObject(duration: number) {
  const timeInSeconds = moment.duration(duration, "seconds");
  const hours = Math.floor(timeInSeconds.hours());
  const minutes = Math.floor(timeInSeconds.minutes());
  return {
    hours,
    minutes,
  };
}
type sessions = {
  id: number;
  topic: string;
  date: Date;
  duration: number;
};

export default function Page() {
  const [timeUnit, setTimeUnit] = useState("minutes");
  const [allSessions, setAllSessions] = useState<Array<sessions>>([]);
  const [summary, setSummary] = useState(0);
  const [startDate, setStartDate] = useState(
    moment().startOf("day").subtract(6, "days").toString()
  );
  const [endDate, setEndDate] = useState(moment().toString());

  useEffect(() => {
    const fn = async () => {
      const sessions = await getSessions(startDate, endDate);
      const summary = await getGroupedSessions(startDate, endDate);
      setAllSessions(sessions);

      const newSummary = summary.reduce((acc, session) => {
        return Number(session.totalTime) + acc;
      }, 0);
      setSummary(newSummary);
    };
    fn();
  }, [startDate, endDate]);

  return (
    <main className="flex flex-col justify-center items-center pt-10">
      {allSessions.length > 0 ? (
        <>
          <ul>
            {allSessions.map((session) => {
              const timeObject = getTimeObject(session.duration);
              const date = moment(session.date, "YYYY-MM-DD");
              const newDate = date.format("Do MMMM YYYY");
              return (
                <li
                  key={session.id}
                  className="border border-black p-4 bg-slate-50"
                >
                  You read {session.topic} for {timeObject.hours}h{" "}
                  {timeObject.minutes}min on {newDate}
                </li>
              );
            })}
          </ul>
          <p>
            Total time Read:{" "}
            {convertToTimeUnit(summary, timeUnit as timeUnit)! % 1 === 0
              ? convertToTimeUnit(summary, timeUnit as timeUnit)
              : convertToTimeUnit(summary, timeUnit as timeUnit)?.toFixed(
                  2
                )}{" "}
            {timeUnit === "hours"
              ? "hours"
              : timeUnit === "minutes"
              ? "minutes"
              : "seconds"}
          </p>
        </>
      ) : (
        <p>You have no study sessions saved</p>
      )}
      <p></p>
      <ExportDataForm
        setTimeUnit={setTimeUnit}
        timeUnit={timeUnit}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </main>
  );
}
