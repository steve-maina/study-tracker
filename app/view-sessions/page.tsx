"use client";
import ExportDataForm from "@/components/ExportData";
import { Button } from "@mui/material";
import moment, { duration } from "moment";
import {
  deleteSession,
  getGroupedSessions,
  getSessions,
} from "../actions/actions";
import { useEffect, useRef, useState } from "react";
import { convertToTimeUnit, timeUnit } from "../lib/assorted-c";

export function getTimeObject(duration: number) {
  const timeInSeconds = moment.duration(duration, "seconds");
  const hours = Math.floor(timeInSeconds.hours());
  const minutes = Math.floor(timeInSeconds.minutes());
  return {
    hours,
    minutes,
  };
}
export type sessions = {
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
  const fn = async () => {
    const sessions = await getSessions(startDate, endDate);
    const summary = await getGroupedSessions(startDate, endDate);
    setAllSessions(sessions);

    const newSummary = summary.reduce((acc, session) => {
      return Number(session.totalTime) + acc;
    }, 0);
    setSummary(newSummary);
  };

  useEffect(() => {
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
                  className="border border-black p-4 bg-slate-50 group flex justify-between"
                >
                  You read {session.topic} for {timeObject.hours}h{" "}
                  {timeObject.minutes}min on {newDate} starting at{" "}
                  {moment(date).format("HH:mm")}
                  <svg
                    onClick={async (e) => {
                      await deleteSession(session);
                      fn();
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                    className="size-6 inline-block hover:cursor-pointer invisible group-hover:visible"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
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
